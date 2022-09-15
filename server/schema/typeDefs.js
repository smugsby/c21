const { gql } = require("apollo-server-express");

const typeDefs = gql `
type User {
    _id: ID 
    username: String
    email: String
    savedBooks: [Book] 
}
type Book {
    bookId:  String
    authors: [String]
    description: String
    image: String
    title: String
    link: String
}
type Auth{
    token: ID!
    user: User
}
type Query{
    users: [User]
    user(_id: String, username: String): User
    currentUser: User
}

`
module.exports = typeDefs;

// type Mutation{
//     addUser(username: String!, email: String, password: String): Auth
//     login(email: String, password: String): Auth
//     addBook(bookId:  String!
//         authors: [String]
//         description: String
//         image: String
//         title: String!
//         link: String): User
//         deleteBook: (bookId: String): User
// }