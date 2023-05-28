import "dotenv/config";
import fastify from "fastify";
import cors from '@fastify/cors'
import { serverRoutes } from "./routes/server";
import fastifyJwt from "@fastify/jwt";

const app = fastify();

app.register(cors, {
  origin: true,
})

app.register(fastifyJwt, {
  secret: 'kfsdjfkldsflkdsngklvazfldsçgnmkkodsaofjxçl',
})

app.register(serverRoutes);
app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("🚀 HTTP server running on port http://localhost:3333");
  });
