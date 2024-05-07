import ActivateAccount from "@/functions/account_activate";
import { PrismaClient } from "@prisma/client";

export default async function ActivatePage({ params: { token } }) {
  const t1 = await ActivateAccount(token);
  // const db = new PrismaClient();
  // const results =
  //   await db.$queryRaw`select * from user_validation where validationtoken = ${token}`;

  return (
    <div>
      <h1>Activation for token no: </h1>
      {/* {results.map((results) => (
        <p key={results.id}>{results.email}</p>
      ))} */}
      {t1}
    </div>
  );
}
