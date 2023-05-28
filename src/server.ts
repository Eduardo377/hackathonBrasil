import 'dotenv/config'
import fastify from 'fastify'
import { serverRoutes } from './routes/server'

const app = fastify()

app.register(serverRoutes)
app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server running on port http://localhost:3333')
  })
