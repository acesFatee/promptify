import { connectToMongo } from "@/utils/db";
import Prompt from "@/utils/models/PromptModel";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToMongo();
    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    new Response("Failed to create prompt", { status: 500 });
  }
};
