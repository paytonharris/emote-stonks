import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUsers = async () => {
  const users = await prisma.user.findMany()

  return users
}

export const getUserById = async (id: number) => {
  const users = await prisma.user.findUnique({
    where: {
      id: id
    }
  })

  return users
}

export const getUserByUsername = async (username: string) => {
  const users = await prisma.user.findUnique({
    where: {
      username
    }
  })

  return users
}

export const createUser = async (username: string, name: string) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        name: name,
        money: 1000,
      }
    })

    return newUser
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export const addEmote = async (name: string, picture: string = '') => {
  try {
    const newEmote = await prisma.emote.create({
      data: {
        name: name,
        picture: picture
      }
    })

    return newEmote
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export const getEmote = async (name: string) => {
  return await prisma.emote.findUnique({
    where: {
      name: name
    }
  })
}

export const getEmotes = async () => {
  return await prisma.emote.findMany()
}

export const addUsageByEmoteName = async (emoteName: string, uses: number, date: string) => {
  try {
    const newEmote = await prisma.emoteUsage.create({
      data: {
        date: (new Date(date) || new Date()),
        uses: uses,
        emote: {
          connectOrCreate: {
            where: {
              name: emoteName,
            },
            create: {
              name: emoteName,
              picture: ""
            }
          }
        }
      },
      include: {
        emote: true
      }
    })

    return newEmote
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export const getUsages = async () => {
  return await prisma.emoteUsage.findMany({
    include: {
      emote: true
    }
  })
}

export const getUsagesBetweenDates = async (emoteName: string, start: string, end: string) => {
  const usages = await prisma.emoteUsage.findMany({
    where: {
      AND: [
        {
          emote: {
            name: emoteName
          }
        },
        {
          date: {
            gte: new Date(start)
          }
        },
        {
          date: {
            lte: new Date(end)
          }
        }
      ]
    }
  })

  const total = usages.reduce((prev, curr) => {
    return prev + curr.uses
  }, 0)

  return { count: total }
}



//     await prisma.$disconnect()



// use something like this to get all the user's investments:
// const user = await prisma.user.findMany({
//   include: {
//     posts: {
//       include: {
//         categories: true,
//       },
//     },
//   },
// })
