import { connectToMongo } from "@/utils/db";
import Prompt from "@/utils/models/PromptModel";

export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    try {
        await connectToMongo();

        const editedNote = await Prompt.findByIdAndUpdate(params.id,{
            prompt: prompt,
            tag: tag
        })

        return new Response(JSON.stringify({editedNote}), { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};
