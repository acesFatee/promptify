import { connectToMongo } from "@/utils/db";
import Prompt from "@/utils/models/PromptModel";

export const GET = async (req, { params }) => {
  try {

    let query = {};

    // Use a regex pattern for case-insensitive search if searchParam is present
    if (params.searchParam) {
      const regexPattern = new RegExp(params.searchParam, 'i');
      query = { prompt: { $regex: regexPattern } };
    }

    const filtered = await Prompt.find(query).populate('creator')

    // console.log(filtered)

    return new Response(JSON.stringify(filtered), { status: 200 });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
