export const isDomain = (string: string): boolean => {
    const validater = new RegExp(
        "^((?!-)[A-Za-z0-9-]" + "{1,63}(?<!-)\\.)" + "+[A-Za-z]{2,6}"
    );

    return validater.test(string);
};
