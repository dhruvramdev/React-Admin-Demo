const {ApolloServer, gql} = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
    {
        id: 1,
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
        isbn : 12345
    },
    {
        id: 4,
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
    {
        id: 3,
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
    {
        id: 2,
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },

    {
        id: 5,
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

const products = [
    {
        id : 1 ,
        name : 'Dhruv' ,
        seller : 123 ,
    } ,{
        id : 2 ,
        name : 'Dhruv' ,
        seller : 123 ,
    } ,{
        id : 3 ,
        name : 'Dhruv' ,
        seller : 123 ,
    } ,
]

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
// const typeDefs = gql`
//     # Comments in GraphQL are defined with the hash (#) symbol.
//
//     # This "Book" type can be used in other type declarations.
//     type Book {
//         id: Int
//         title: String
//         author: String
//     }
//
//     # The "Query" type is the root of all GraphQL queries.
//     # (A "Mutation" type will be covered later on.)
//     type Query {
//         allBooks: [Book]
//         Book(id : Int) : Book
//     }
// `;
const typeDefs = gql`
    type Query {
        Book(id: ID!): Book
        allBooks(page: Int): [Book]
        Product(id: ID!) : Product
        allProducts(page: Int): [Product]
    }

    type Mutation {
        createBook(
            title: String!
            views: Int!
            user_id: ID!
        ): Book
        updateBook(
            id: ID!
            title: String!
            views: Int!
            user_id: ID!
        ): Book
        deleteBook(id: ID!): Boolean
    }

    type Book {
        id: ID!
        title: String!
        author: String!
        isbn : Int
    }
    
    type Product {
        id : ID! 
        name : String! 
        seller : ID!
    }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
    Query: {
        allBooks: (parent, args, context, info) => {
            console.log(args);
            return books
        },
        Book: (parent, args, context, info) => books[0],
        allProducts: (parent, args, context, info) => {
            console.log(args);
            return products
        },
        Product: (parent, args, context, info) => products[0]
    },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({typeDefs, resolvers});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});