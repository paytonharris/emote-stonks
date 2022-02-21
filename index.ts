import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      username: 'Alice',
      name: 'Ally',
      money: 1000,
    },
  })

  const allUsers = await prisma.user.findMany({
    include: {
      investments: true
    },
  })
  console.dir(allUsers, { depth: null })
}

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


// main()
//   .catch((e) => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
