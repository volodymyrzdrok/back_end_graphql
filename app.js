const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const cors = require("cors");

const URL_MONGO =
  "mongodb+srv://test_user:20031111@cluster0.q7egu.mongodb.net/chat_test?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
mongoose.connect(URL_MONGO, options);
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`connection error : ${err}`));
dbConnection.once("open", () => console.log("connected to  db!!!!!!!!!!"));
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("===========server started ", PORT);
});
