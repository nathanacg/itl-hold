export function calculatePasswordStrength(password: string): number {
    const regexUppercase = /[A-Z]/;
    const regexLowercase = /[a-z]/;
    const regexNumber = /[0-9]/;
    const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    let strength = 0;
    if (password.length >= 6) {
        strength += regexUppercase.test(password) ? 1 : 0;
        strength += regexLowercase.test(password) ? 1 : 0;
        strength += regexNumber.test(password) ? 1 : 0;
        strength += regexSpecialChar.test(password) ? 1 : 0;
    }

    return strength;
}