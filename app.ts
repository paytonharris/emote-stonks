import { createServer } from '@graphql-yoga/node'
import { getUsers, getUserById, getUserByUsername, createUser } from './index'

// Create your server
const server = createServer({
  schema: {
    typeDefs: /* GraphQL */ `
      type User {
        id: ID
        username: String
        name: String
        money: Int
      }
      type Query {
        users: [User]
        userById(id: ID): User
        userByUsername(username: String): User
        createUser(username: String, name: String): User
      }
    `,
    resolvers: {
      Query: {
        users: async () => {
          const users = await getUsers()

          return users;
        },
        userById: async (obj, args, context, info) => {
          return await getUserById(parseInt(args.id, 10))
        },
        userByUsername: async (obj, args, context, info) => {
          return await getUserByUsername(args.username)
        },
        createUser: async (obj, args) => {
          return await createUser(args.username, args.name)
        }
      },
    },
  },
})
server.start()