
import UpdatePass from "@/components/changepassword"
import GetCookie from "@/functions/getcookie"

export default async function page({ searchParams }) {

    const currentsession = await GetCookie("passreset")
    var currentsessionval = "notset";
    try {
        currentsessionval = currentsession.value;
    } catch (e) {
        console.log("cookie not set");
    }

    // console.log(currentsession.value);

    return (
        <div>
            {/* <h1>Received URL params: </h1>

            <p>Email - {searchParams.email}</p>
            <p>email cookie- {searchParams.cookie}</p>
            <p>cookie- {currentsessionval}</p> */}

            {searchParams.cookie == currentsessionval ? <UpdatePass email={searchParams.email} /> : <p>Cookie mismatch</p>}

        </div >
    )
}
