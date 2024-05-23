import { reqGroqAI } from "../../lib/utils/groq";

export async function POST(req) {
  const data = await req.json();
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  try {
    const chatCompletion = await reqGroqAI(data.content);
    return Response.json({
      content: chatCompletion.choices[0]?.message?.content || "",
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" });
  }
}
