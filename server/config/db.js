import { neon } from "@neondatabase/serverless"
import dotenv from "dotenv"

dotenv.config()

export const sql = neon(process.env.DATABASE_URL)
export const testDBConnection = async () => {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('✅ Database connected ');
    return true;
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    return false;
  }
};