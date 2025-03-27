class Regex {

    const
    authenticationRegex = {
        emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, // mind. 8 Zeichen, eine Zahl, ein Großbuchstabe, ein Kleinbuchstabe, ein Sonderzeichen
        nameRegex: /^[a-zA-Z]+$/,
    }
}

export default new Regex();
