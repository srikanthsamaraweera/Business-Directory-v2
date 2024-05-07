import { PrismaClient } from "@prisma/client";
import "./function.css";
import { redirect } from "next/navigation";

export default async function ActivateAccount(token) {
  const db = new PrismaClient();
  const validateuser =
    await db.$queryRaw`update user_validation set validated=1 where validationtoken=${token}`;
  const results =
    await db.$queryRaw`select * from user_validation where validationtoken = ${token}`;
  console.log(results.map((r) => r.validated).toString());
  const validated = results.map((r) => r.validated).toString();


  return (
    <div>
      {validated == 1 ? (
        "Validated"
      ) : (
        redirect('/register/revalidate')
      )}
    </div>
  );
}
