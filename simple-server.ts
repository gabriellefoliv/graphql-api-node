import { ApolloServer, gql } from 'apollo-server'
import {randomUUID } from 'node:crypto'

// GraphQL resolve under fetching e over fetching
// 
// Under fetching
// Rota HTTP que retorna dados de menos
// O frontend ta tendo que fazer mais requisições pra buscar mais dados. Sendo que uma única requisição
// poderia estar trazendo todos esses dados. Ex: Requisição que puxa os posts mas não seus comentários.
//
// Over fetching
// Rota HTTP que retorna dados de mais
// Ex: Requisição que puxa os posts e comentários, porém n precisa dos comentários

// Schema first approach (typeDefs)
// Code first (o schema é criado de forma automatica com base no código)

const typeDefs = gql`
    type User {
        id: String!
        name: String!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
        createUser(name: String): User!
    }
`

interface User{
    id: string
    name: string
}

const users: User[] = [];

const server = new ApolloServer({
    typeDefs, 
    resolvers: {
        Query: {
            users: () => {
                return users
            }
        },
        Mutation: {
            createUser: (_, args) => {
                users.push({
                    id: randomUUID(),
                    name: args.name,
                })

                return args.name
            }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`HTTP server running on ${url}`);
})