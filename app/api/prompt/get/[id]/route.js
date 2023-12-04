import { connectToMongo } from "@/utils/db";
import Prompt from "@/utils/models/PromptModel";

export const GET = async (req, { params }) => {
  try {
    await connectToMongo();
    const post = await Prompt.findById(params.id);
    console.log(post)
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Error Fetching post", { status: 500 });
  }
};
