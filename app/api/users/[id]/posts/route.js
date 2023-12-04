import { connectToMongo } from "@/utils/db";
import Prompt from "@/utils/models/PromptModel";

export const GET = async (req, {params}) => {
  try {
    await connectToMongo();
    const prompts = await Prompt.find({creator: params.id}).populate('creator')

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    new Response("Failed to fetch prompts", { status: 500 });
  }
};
