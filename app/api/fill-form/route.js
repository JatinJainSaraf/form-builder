import Form from "@models/form";
import { connectToDB } from "@utils/database";

export const GET = async (request)=> {
    try{
        await connectToDB();
        const formDetails = await Form.findOne();
        return new Response(JSON.stringify(formDetails), {status: 200})
    } catch(error) {
        return new Response("Failed to load forms", {status: 500})
    }
}