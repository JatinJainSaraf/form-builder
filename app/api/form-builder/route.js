import Form from "@models/form";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const formJson = await request.json();
    try {
        await connectToDB();
        const newForm = new Form(formJson);
        await newForm.save();
        return new Response(newForm, { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Form", { status: 500 });
    }
}