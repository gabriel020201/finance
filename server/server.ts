import Fastify from "fastify";
import cors from "@fastify/cors";
import fs from "fs";
import path from "path";

const fastify = Fastify({ logger: true });

fastify.register(cors, { origin: "*" });

fastify.get("/transactions", async (request, reply) => {
  const filePath = path.join(__dirname, "..", "web", "src", "assets", "transactions.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
});

fastify.listen({ port: 3333 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});