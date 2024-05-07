import ResetPass from "@/components/resetpass";
export const metadata = {
    title: "Reset Password",
    description: "Reset your password here.",
};

export default function page() {

    return (
        <div className="md:m-auto m-2">
            <ResetPass />
        </div>

    )
}
