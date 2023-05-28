import { FastifyInstance } from "fastify";
import { string, z } from "zod";
import { prisma } from "../lib/prisma";
import { request } from "http";

export async function serverRoutes(app: FastifyInstance) {
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
  app.get("/login", async () => {
    const user = await prisma.user.findMany();

    return user;
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
      
    });
    const { login, email, name, password } = bodySchema.parse(request.body)

    const users = await prisma.user.create({
      data: {
        login,
        email,
        name,
        password,
      }
    })
    return users
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
        
      });

      const {name, login, password, email} = bodySchema.parse(request.body)
      
    const user = await prisma.user.update({
          where: {
            id,
          },
          data:{
            name,
            login,
            password,
            email
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
