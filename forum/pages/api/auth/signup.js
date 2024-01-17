import { Content } from "next/font/google";
import bcrypt from "bcrypt";
import { connectDB } from "@/util/database";

export default async function handler(요청, 응답) {
  if (요청.method == "POST") {
    let hash = await bcrypt.hash(요청.body.password, 10);
    요청.body.password = hash;
    let db = (await connectDB).db("forum");
    await db.collection("user_cred").insertOne(요청.body);
    응답.status(200).json("가입성공");
  }
}
