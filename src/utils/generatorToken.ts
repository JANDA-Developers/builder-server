// import * as dotenv from "dotenv";
// dotenv.config({
//     path: __dirname + "/.env",
// });

console.log(
    "generator token process.env.JWT_SECRET : " + process.env.JWT_SECRET
);

import * as jwt from "jsonwebtoken";
export const generateToken = (id: string): string =>
    jwt.sign({ id }, process.env.JWT_SECRET || "iaefaefaefaf");
