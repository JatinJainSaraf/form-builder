import Form from "@models/form";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const formJson = await request.json();
    try {
        await connectToDB();
        let formData = await Form.findOne();
        if (formData) {
            formData.formJson = formJson
            await formData.save()
        } else {
            formData = new Form({formJson});
            await formData.save();
        }
        return new Response(formData, { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Form", { status: 500 });
    }
}