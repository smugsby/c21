const { AuthicationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User } = require("../models");

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return User.find({});

        },
        getUser: async (parent, arguement) => {
            return User.findOne({ arguement });

        },
        currentUser: async (parent, arguement, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
            }
            else {
                throw new AuthicationError("996")
            }
        }
    },
    //add mutations
    Mutation: {
        addUser: async (parent, arguement) => {
            const user = await User.create(arguement);
            const token = signToken(user)
            return {
                token, user
            };
        },
        // addBook: async (parent, book, context) => {
        //     if (context.user) {
        //         const bookAdd = await User.findOneAndUpdate(
        //             { _id: context.user._id },
        //             { $addToSet: { savedBooks: { book } } }
        //         );
        // //         return bookAdd;
        //     }
        // },
        addBook: async (parent, args, context) => {
            console.log("Add book")

            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args } },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        login: async (parent, { email, password }) => {
            const loginUser = await User.findOne({ email });
            const token = signToken(loginUser)
            return {
                token, loginUser
            };
        },
        deleteBook: async (parent, { id }, context) => {
            if (context.user) {
                const bookGone = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { id } } }
                );
                return bookGone;
            }
        },
    }
}

module.exports = resolvers