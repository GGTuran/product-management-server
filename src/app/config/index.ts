import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });
console.log(process.env.PORT)
export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds:process.env.BCRYPT_SALT_ROUNDS,

}