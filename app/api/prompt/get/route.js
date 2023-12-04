import { connectToMongo } from "@/utils/db";
import Prompt from "@/utils/models/PromptModel";

export const GET = async (req, res) => {
  try {
    await connectToMongo();
    const allPrompts = await Prompt.find().populate('creator')

    return new Response(JSON.stringify(allPrompts), { status: 200 });
  } catch (error) {
    new Response("Failed to fetch prompts", { status: 500 });
  }
};
