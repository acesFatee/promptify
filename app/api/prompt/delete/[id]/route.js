import { connectToMongo } from "@/utils/db";
import Prompt from "@/utils/models/PromptModel";

export const DELETE = async (req, { params }) => {
  try {
    await connectToMongo();
    const { id } = params;
    await Prompt.findByIdAndDelete(id);
    return new Response("Post deleted", { status: 201 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
