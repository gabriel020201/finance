<<<<<<< HEAD
import Fastify from 'fastify';

const fastify = Fastify();
type RouteKey = 'transactions' | 'banks' | 'categories';

const db: Record<RouteKey, any[]> = {
  transactions: [],
  banks: [],
  categories: [],
};

function crudRoutes(route: RouteKey) {
  fastify.get(`/${route}`, (req, reply) => reply.send(db[route]));
  fastify.post(`/${route}`, async (req, reply) => {
    const item = { id: Date.now(), ...(req.body as object) };
    db[route].push(item);
    reply.code(201).send(item);
  });
  fastify.patch(`/${route}/:id`, async (req, reply) => {
    const { id } = req.params as any;
    const idx = db[route].findIndex((i) => i.id == id);
    if (idx === -1) return reply.code(404).send();
    db[route][idx] = { ...db[route][idx], ...(req.body as object) };
    reply.send(db[route][idx]);
  });
  fastify.delete(`/${route}/:id`, async (req, reply) => {
    const { id } = req.params as any;
    const idx = db[route].findIndex((i) => i.id == id);
    if (idx === -1) return reply.code(404).send();
    db[route].splice(idx, 1);
    reply.code(204).send();
  });
}

(['transactions', 'banks', 'categories'] as RouteKey[]).forEach(crudRoutes);

fastify.get('/', (req, reply) => {
  reply.send({
    message: 'API Finance funcionando! Rotas: /transactions, /banks, /categories'
  });
});

fastify.listen({ port: 3333 }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening at ${address}`);
=======
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
>>>>>>> f5c4d04ed7c15192faa363032bcdc85e4a3a2b56
});