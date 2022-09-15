const { AuthicationError } = require("apollo-server-express");
const {signToken} = require("../utils/auth");
const {User} = require("../models");

const resolvers = {
    Query: {
        users: async()=>{
            return User.find({});
        
        },
        user: async(arguement)=>{
            return User.findOne({arguement});
        
        },
        currentUser: async(context)=>{
            if (context.user){
                return User.findOne({_id: context.user._id}).populate("savedBooks")
            }
            else {
                throw new AuthicationError("996")
            }
        }
    }
}

module.exports = resolvers