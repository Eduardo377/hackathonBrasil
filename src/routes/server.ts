import { FastifyInstance } from 'fastify'
import { string, z } from 'zod'
import { prisma } from '../lib/prisma'

export async function serverRoutes(app: FastifyInstance) {
  app.get('/user', async () => {
    const users = await prisma.usuario.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        login: user.login,
      }
    })
  })
  app.get('/login', async () => {
    const user = await prisma.usuario.findMany()

    return user
  })

  app.get('/user/:id', async (request) => {
    const paramsSchema = z.object({
      id: string().uuid(),
    })

    // const { id } = paramsSchema.parse(request.params)
    return paramsSchema
  })

  app.post('/user', async () => {})

  app.put('/user/:id', async () => {})

  app.delete('/user/:id', async () => {})
}
