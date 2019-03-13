const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const app = express()

const typeDefs = gql`
  type Query {
    hello: String!
    error: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello, GraphQL',
    error: () => {
      const errors = [{ message: 'Invalid something' }]
      const error = new Error('Invalid input')
      error.data = errors
      error.code = 422

      throw error
    },
  },
}

const formatError = err => {
  if (!err.originalError) {
    return err
  }

  const data = err.originalError.data
  const message = err.message || 'An error occurred.'
  const code = err.originalError.code || 500
  return { message, status: code, data }
}

const server = new ApolloServer({ typeDefs, resolvers, formatError })

server.applyMiddleware({ app })

app.listen(4000, () => console.log('Server running on port 4000'))
