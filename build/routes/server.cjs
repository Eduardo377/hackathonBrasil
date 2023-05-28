"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/server.ts
var server_exports = {};
__export(server_exports, {
  serverRoutes: () => serverRoutes
});
module.exports = __toCommonJS(server_exports);
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/server.ts
async function serverRoutes(app) {
  app.get("/user", async () => {
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
  app.get("/user/:id", async (request) => {
    const paramsSchema = import_zod.z.object({
      id: (0, import_zod.string)().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id
      }
    });
    return user;
  });
  app.post("/user", async (request) => {
    const bodySchema = import_zod.z.object({
      name: (0, import_zod.string)(),
      login: (0, import_zod.string)(),
      password: (0, import_zod.string)(),
      email: (0, import_zod.string)(),
      cpf: (0, import_zod.string)(),
      dataNasc: import_zod.z.coerce.date()
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
  app.put("/user/:id", async (request) => {
    const paramsSchema = import_zod.z.object({
      id: (0, import_zod.string)().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const bodySchema = import_zod.z.object({
      name: (0, import_zod.string)(),
      login: (0, import_zod.string)(),
      password: (0, import_zod.string)(),
      email: (0, import_zod.string)(),
      cpf: (0, import_zod.string)(),
      dataNasc: import_zod.z.coerce.date()
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
  app.delete("/user/:id", async (request) => {
    const paramsSchema = import_zod.z.object({
      id: (0, import_zod.string)().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    await prisma.user.delete({
      where: {
        id
      }
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  serverRoutes
});
