module.exports = {
    Query: `
        allOrders: [Order],
        Order(id: ID!): Order
    `,
    Mutation: `
        addOrder(
            userID: ID!,
            productID: ID!,
            discount: Int!,
            shipping: Int!
        ): Order,

        removeOrder(
            orderID: ID
        ): Order
    `
}