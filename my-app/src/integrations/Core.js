// src/integrations/Core.js
import OpenAI from "openai";

// initialize client
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // ⚠️ only in dev
});

export async function InvokeLLM(prompt) {
  try {
    console.log("API Key Loaded:", import.meta.env.VITE_OPENAI_API_KEY ? "✅ Yes" : "❌ No");

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // you can change later
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ]
    });

    // get plain text output
    const content = response.choices[0].message?.content;
    console.log("LLM Response:", content);

    return content;

  } catch (err) {
    console.error("InvokeLLM Error:", err);
    return "Error: Failed to connect to OpenAI";
  }
}

