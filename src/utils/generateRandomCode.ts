const genCode = (d: number) =>
    Math.random().toString(36).substr(2, d).toUpperCase();

const numTo36str = (n: number) => n.toString(36).toUpperCase();

const charSum = (v: string) =>
    [...v].map((v) => v.charCodeAt(0)).reduce((a, b) => a + b);

export const generateRandomStringCode = (
    digits = 6,
    ableToValidate = false
) => {
    if (ableToValidate) {
        const tempCode = genCode(digits - 2);
        const charCodeSum = numTo36str(charSum(tempCode));
        return charCodeSum + tempCode;
    }
    return genCode(digits);
};
