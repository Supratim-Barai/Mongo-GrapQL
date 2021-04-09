import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app });

  //........................MongoDb Connect...............................//

  await mongoose.connect('mongodb+srv://supratim:supi1234@cluster0.cu67u.mongodb.net/test3',
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
).then(() => {
  console.log("connection to database established")
})
  .catch(err => {
      console.log("db error", err);
      process.exit(-1)
  })

  
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
