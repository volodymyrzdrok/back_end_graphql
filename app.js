const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const URL_MONGO = process.env.URL_MONGO;

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
