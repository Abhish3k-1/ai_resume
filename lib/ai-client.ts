/**
 * AI Client — Groq API
 */

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const TIMEOUT_MS = 20_000;
const MODEL = "llama-3.3-70b-versatile"; // Extremely fast Groq model

export async function callAI(
  systemPrompt: string,
  userMessage: string,
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    console.log(`[AI] Calling Groq API with model: ${MODEL}`);
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 4096,
        response_format: { type: "json_object" },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`HTTP ${response.status}: ${body.slice(0, 150)}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty response from Groq API");
    
    // DEBUG: write the raw result so we know WHY it fails JSON parsing if it does
    require("fs").writeFileSync("dbg-ai-raw-response.txt", content);
    console.log(`[AI] ✅ Success response from Groq`);
    return content;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[AI] Error calling Groq API: ${msg}`);
    require("fs").writeFileSync("dbg-failed.txt", msg);
    throw new Error(`AI generation failed: ${msg}`);
  } finally {
    clearTimeout(timeout);
  }
}
