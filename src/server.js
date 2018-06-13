import 'babel-core/register'
import 'babel-polyfill'
import { graphqlExpress } from 'apollo-server-express'
import schema from 'api/graphql/schema'
import bodyParser from 'body-parser'
import express from 'express'

const app = express()
const port = parseInt(process.env.PORT, 10) || 3000

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(() => {
    return {
      schema,
    }
  })
)

app.listen(port)
