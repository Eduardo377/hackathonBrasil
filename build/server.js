"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_config2 = require("dotenv/config");
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));

// src/routes/server.ts
var import_zod2 = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/infra/env.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  API_PORT: import_zod.z.coerce.number()
});
var getEnv = envSchema.safeParse(process.env);
if (!getEnv.success) {
  const errorMessage = "load environment failed";
  console.error(errorMessage, getEnv.error.format());
  throw new Error(errorMessage);
}
var env = getEnv.data;

// src/routes/server.ts
async function serverRoutes(app2) {
  app2.get("/", async () => {
    return `Hello World \u{1F680} HTTP server running on port https://localhost:/${env.API_PORT}`;
  });
  app2.get("/user", async () => {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "asc"
      }
    });
    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        login: user.login
      };
    });
  });
  app2.get("/user/:id", async (request) => {
    const paramsSchema = import_zod2.z.object({
      id: (0, import_zod2.string)().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id
      }
    });
    return user;
  });
  app2.post("/user", async (request) => {
    const bodySchema = import_zod2.z.object({
      name: (0, import_zod2.string)(),
      login: (0, import_zod2.string)(),
      password: (0, import_zod2.string)(),
      email: (0, import_zod2.string)(),
      cpf: (0, import_zod2.string)(),
      dataNasc: import_zod2.z.coerce.date()
    });
    const {
      login,
      email,
      name,
      password,
      cpf,
      dataNasc
    } = bodySchema.parse(request.body);
    await prisma.user.create({
      data: {
        login,
        email,
        name,
        password,
        cpf,
        dataNasc
      }
    });
    const userCreatorSuccess = { login, email, name, cpf, dataNasc };
    return userCreatorSuccess;
  });
  app2.put("/user/:id", async (request) => {
    const paramsSchema = import_zod2.z.object({
      id: (0, import_zod2.string)().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const bodySchema = import_zod2.z.object({
      name: (0, import_zod2.string)(),
      login: (0, import_zod2.string)(),
      password: (0, import_zod2.string)(),
      email: (0, import_zod2.string)(),
      cpf: (0, import_zod2.string)(),
      dataNasc: import_zod2.z.coerce.date()
    });
    const {
      name,
      login,
      password,
      email,
      cpf,
      dataNasc
    } = bodySchema.parse(request.body);
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        login,
        password,
        email,
        cpf,
        dataNasc
      }
    });
    return user;
  });
  app2.delete("/user/:id", async (request) => {
    const paramsSchema = import_zod2.z.object({
      id: (0, import_zod2.string)().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    await prisma.user.delete({
      where: {
        id
      }
    });
  });
}

// src/server.ts
var import_jwt = __toESM(require("@fastify/jwt"));
var app = (0, import_fastify.default)();
app.register(import_jwt.default, {
  secret: "kfsdjfkldsflkdsngklvazflds\xE7gnmkkodsaofjx\xE7l"
});
app.register(import_cors.default, {
  origin: true
});
app.register(serverRoutes);
app.listen({
  port: env.API_PORT,
  host: "0.0.0.0"
}).then(() => {
  console.log(`Hello World \u{1F680} HTTP server running on port https://localhost:${env.API_PORT}`);
});
