import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express, { Express } from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./users/resolver";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
    validate: false,
  });

  // apollo server configuration
  const server = new ApolloServer({
    schema,
  });

  await server.start();

  // express configuration
  const app = express();
  app.use(
    "/",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise<void>((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`Server ready at http://localhost:4000`);
}

main();
