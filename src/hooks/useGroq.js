import { useState } from "react";
import Groq from "groq-sdk";
import useRemoveCredits from "./useRemoveCredit"; 


const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_KEY || "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",
  dangerouslyAllowBrowser: true,
});

export function useGroq() {

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Always initialize the hook at the top level (correct way)
  const { removeCredits } = useRemoveCredits(); 

  const isAvaliable = localStorage.getItem("credits");
  if(isAvaliable == "0") {
    alert('You Donot have enough Credits')
    window.location.href = '/pricing'
  }

  const fetchGroqResponse = async (taskType, prompt) => {
    setLoading(true);
    setError(null);

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: ` ${taskType} ${prompt}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

      setResponse(chatCompletion.choices[0]?.message?.content || "No response");

      // ✅ Call removeCredits only after success
      await removeCredits();  

    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { fetchGroqResponse, response, loading, error };
}
