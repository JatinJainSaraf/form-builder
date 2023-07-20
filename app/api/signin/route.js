import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { username, password } = await request.json();
  try {
    await connectToDB();
    const user = await User.findOne({ username });
    if (!user) {
      return new Response("Invalid username or password", { status: 401 })
    }
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return new Response("Invalid password", { status: 401 })
    }
    const session = { userId: user._id, username: user.username, email: user.email, role: user.role };
    return new Response(JSON.stringify(session), { status: 200 })
  } catch (error) {
    console.log("Error checking if user exists: ", error.message);
    return false
  }
}