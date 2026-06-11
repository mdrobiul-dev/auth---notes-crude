import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });


const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5000,
    mongoDbUrl: process.env.MONGO_URI,

    jwt : {
        secret: process.env.JWT_SECRET,
        expireIN: process.env.JWT_EXPIRES_IN || "1d",
        refresh_secret : process.env.JWT_REFRESH_SECRET,
        refresh_expiresIn : process.env.JWT_REFRESH_EXPIRES_IN || "15d"
    },
    bcryptSaltRound: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12
};

export default config;
