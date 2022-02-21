import { createServer } from '@graphql-yoga/node'
import { join } from 'path/posix'
import {
  getUsers,
  getUserById,
  getUserByUsername,
  createUser,
  addUsageByEmoteName,
  addEmote,
  getEmote,
  getEmotes,
  getUsages,
  getUsagesBetweenDates
} from './index'

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
      type EmoteUsage {
        date: String
        emote: Emote
        emoteId: Int
        uses: Int
      }
      type Emote {
        id: Int
        name: String
        picture: String
        usages: [EmoteUsage]
        investments: [Investment]
      }
      type Investment {
        id: Int
        createdAt: String
        updatedAt: String
        boughtAt: String
        emote: Emote
        price: Int
        creator: User
      }
      type Count {
        count: Int
      }
      type Query {
        users: [User]
        userById(id: ID): User
        userByUsername(username: String): User
        getEmote(name: String): Emote
        emotes: [Emote]
        usages: [EmoteUsage]
        getUsagesBetweenDates(name: String, start: String, end: String): Count
      }
      type Mutation {
        createUser(username: String, name: String): User
        addUsageByEmoteName(name: String, uses: Int, date: String): EmoteUsage
        addEmote(name: String, picture: String): Emote
      }
    `,
    resolvers: {
      Query: {
        users: async () => {
          return await getUsers()
        },
        userById: async (obj, args, context, info) => {
          return await getUserById(parseInt(args.id, 10))
        },
        userByUsername: async (obj, args, context, info) => {
          return await getUserByUsername(args.username)
        },
        getEmote: async (obj, args) => {
          return await getEmote(args.name)
        },
        emotes: async () => {
          return await getEmotes()
        },
        usages: async () => {
          return await getUsages()
        },
        getUsagesBetweenDates: async (obj, args) => {
          return await getUsagesBetweenDates(args.name, args.start, args.end) // the dates need to be in ISO timestamp format. Unix millis don't work.
        }
      },
      Mutation: {
        addUsageByEmoteName: async (obj, args) => {
          return await addUsageByEmoteName(args.name, args.uses, args.date)
        },
        createUser: async (obj, args) => {
          return await createUser(args.username, args.name)
        },
        addEmote: async (obj, args) => {
          return await addEmote(args.name, args.picture || "")
        },
      }
    },
  },
})
server.start()