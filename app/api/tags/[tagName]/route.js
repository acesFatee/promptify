import { connectToMongo } from "@/utils/db";
import Prompt from "@/utils/models/PromptModel";

export const GET = async (req, { params }) => {
  try {
    await connectToMongo();
    const { tagName } = params;
    const taggedPosts = await Prompt.find({ tag: tagName }).populate('creator')
    return new Response(JSON.stringify(taggedPosts), { status: 200 });
  } catch (error) {
    return new Response({ error: "Internal Server Error" }, { status: 500 });
  }
};
