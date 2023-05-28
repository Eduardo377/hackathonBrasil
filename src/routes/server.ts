import { FastifyInstance } from "fastify";
import { string, z } from "zod";
import { prisma } from "../lib/prisma";
import { env } from "../infra/env";

export async function serverRoutes(app: FastifyInstance) {

  app.get("/", async () => {
    return `Hello World 🚀 HTTP server running on port https://hackathon-brasil.vercel.app/${env.API_PORT}`;
  })

  app.get("/user", async () => {
    const users = await prisma.user.findMany({
      orderBy:{
        createdAt: "asc"
      }
    });

    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        login: user.login,
      };
    });
  });

  app.get("/user/:id", async (request) => {
    const paramsSchema = z.object({
      id: string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params)
    
    const user = await prisma.user.findUniqueOrThrow({
          where: {
            id,
          },
        });
    return user;
  });

  app.post("/user", async (request) => {
    const bodySchema = z.object({
      name : string(),
      login : string(),
      password : string(),
      email : string(),
      cpf : string(),
      dataNasc : z.coerce.date(),
    });
    const {
      login,
      email,
      name,
      password,
      cpf,
      dataNasc,
    } = bodySchema.parse(request.body)

    await prisma.user.create({
      data: {
        login,
        email,
        name,
        password,
        cpf,
        dataNasc,
      }
    })
    const userCreatorSuccess = {login, email, name, cpf, dataNasc}
    return userCreatorSuccess
  });

  app.put("/user/:id", async (request) => {
    const paramsSchema = z.object({
      id: string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      name : string(),
      login : string(),
      password : string(),
      email : string(),
      cpf : string(),
      dataNasc : z.coerce.date(),
      });

      const {
        name,
        login,
        password,
        email,
        cpf,
        dataNasc
      } = bodySchema.parse(request.body)
      
    const user = await prisma.user.update({
          where: {
            id,
          },
          data:{
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
    const paramsSchema = z.object({
      id: string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params)

    await prisma.user.delete({
          where: {
            id,
          },
        });
  });
}


