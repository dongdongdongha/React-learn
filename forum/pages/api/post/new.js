import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
  let session = await getServerSession(요청, 응답, authOptions);
  if (session) {
    요청.body.author = session.user.email;
  }

  if (요청.method == "POST") {
    console.log(요청.body);
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").insertOne(요청.body);
    응답.status(200).redirect("/list");
  }
}
