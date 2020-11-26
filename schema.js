const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNumber,
  GraphQLNonNull,
} = require("graphql");
const ModelChat = require("./modelChat");

const ChatType = new GraphQLObjectType({
  name: "Chat",
  fields: () => ({
    _id: { type: GraphQLID },
    message: { type: GraphQLString },
    date: { type: GraphQLString },
    bot: { type: GraphQLBoolean },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createMess: {
      type: ChatType,
      args: {
        message: { type: GraphQLString },
        date: { type: GraphQLString },
        bot: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        const newMessage = new ModelChat({
          message: args.message,
          bot: args.bot,
          date: args.date,
        });
        return newMessage.save();
      },
    },
    deleteMess: {
      type: ChatType,
      args: {
        _id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return ModelChat.findByIdAndDelete(args._id);
      },
    },
    updateMess: {
      type: ChatType,
      args: {
        _id: { type: GraphQLID },
        message: { type: GraphQLString },
        date: { type: GraphQLString },
        bot: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        return ModelChat.findOneAndUpdate(
          args._id,
          { $set: { message: args.message, bot: args.bot, date: args.date } },
          { new: true }
        );
      },
    },
  },
});
const Query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    messageSingle: {
      type: ChatType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        return ModelChat.findById(args._id);
      },
    },
    messageAll: {
      type: new GraphQLList(ChatType),
      resolve(parent, args) {
        return ModelChat.find();
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
