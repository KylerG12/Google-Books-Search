const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]!
  }

  type Book {
    _id: ID
    bookId: String
    authors: [String]!
    description: String
    title: String
    image: IMAGE
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input Content{
    bookId: String
    authors: [String]!
    description: String
    title: String
    image: IMAGE
    link: String
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveBook(input: Content): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
