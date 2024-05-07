import GoogleSignIn from "@/components/googlesignin"
import LogForm2 from "@/components/loginform2"

export const metadata = {
    title: "Signin",
    description: "Signin with Google or email",
};
export default async function SignInPage() {
    return (
        <div className="flex flex-col">
            {/* {Object.values(providerMap).map((provider) => (
               
               <form
                    key={provider.id}
                    action={async () => {
                        "use server"
                        await signIn(provider.id)
                    }}
                >
                    <button type="submit">
                        <span>Sign in with {provider.name}</span>
                    </button>
                </form>
            ))} */}
            {/* 
            <form
                key={"google"}
                action={async () => {
                    "use server"
                    await signIn("google")
                }}
            >
                <button type="submit">
                    <span>Sign in with Google</span>
                </button>

            </form> */}

            <GoogleSignIn />
            <div className="text-center"><p>OR</p></div>

            <LogForm2 />


        </div>
    )
}