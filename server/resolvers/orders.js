const Product = require('../models/product');
const Order = require('../models/order');

module.exports = {
    Query: {
        allOrders: (parent, args, context, info) => {
            return Order.find({}).populate({
                path: 'product',
                populate: {
                    path: 'seller'
                }
            }).exec().then(
                data => data
            )
        },
        Order: (parent, args, context, info) => {
            return Order.findOne({_id: args.id}).populate({
                path: 'product',
                populate: {
                    path: 'seller'
                }
            }).exec().then(
                data => data
            )
        }
    },

    Mutation: {
        addOrder: (parent, args, context, info) => {
            return Product.findOne({_id: args.productID}).exec().then(
                foundProduct => {
                    return Order.create({
                        discount: args.discount,
                        shipping: args.shipping,
                        user: args.userID
                    }).then(
                        createdOrder => {
                            createdOrder.product = foundProduct;
                            createdOrder.save();
                            // Solve populate issue - seller
                            return createdOrder
                        }
                    )
                }
            )
        },
        removeOrder: (parent, args, context, info) => {
            return Order.findOneAndDelete({_id: args.orderID}).populate({
                path: 'product',
                populate: {
                    path: 'seller'
                }
            }).exec().then(
                data => data
            );
        }
    }
}