import "dotenv/config";
import fastify from "fastify";
import cors from '@fastify/cors'
import { serverRoutes } from "./routes/server";
import fastifyJwt from "@fastify/jwt";
import { env } from "./infra/env";

const app = fastify();
app.register(fastifyJwt, {
  secret: 'kfsdjfkldsflkdsngklvazfldsçgnmkkodsaofjxçl',
})
app.register(cors, {
  origin: true,
})


app.register(serverRoutes);
app
.listen({
    port: env.API_PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`🚀 HTTP server running on port http://localhost:${env.API_PORT}`);
  });