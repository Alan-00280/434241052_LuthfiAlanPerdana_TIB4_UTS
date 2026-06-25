import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import "dotenv/config";
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
}
const adapter = new PrismaPg({
    connectionString: databaseUrl,
});
const prisma = new PrismaClient({ adapter });
function withPrisma(c, next) {
    if (!c.get("prisma")) {
        c.set("prisma", prisma);
    }
    return next();
}
export default withPrisma;
