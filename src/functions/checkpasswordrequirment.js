
export default async function CheckPasswordRequirment(password) {
    var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (password.length < 6 || password.length > 20) {
        return false;
    }
    if (!regularExpression.test(password)) {

        return false;
    }
    return true;
}
