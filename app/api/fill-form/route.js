import Form from "@models/form";
import { connectToDB } from "@utils/database";

export const GET = async (request)=> {
    try{
        await connectToDB();
        const formDetails = await Form.findOne();
        console.log("🚀 ~ file: route.js:8 ~ GET ~ formDetails:", formDetails)
        return new Response(JSON.stringify(formDetails.components), {status: 200})
    } catch(error) {
        return new Response("Failed to load forms", {status: 500})
    }
}