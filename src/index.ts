import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./user/resolver";
import { AdminResolver } from "./admin/resolver";
import cors from "cors";
import dotenv from "dotenv";
import { statusCodes } from "./config/const.config";
dotenv.config();

async function main() {
  const schema = await buildSchema({
    resolvers: [UserResolver, AdminResolver],
    emitSchemaFile: true,
    validate: false,
  });

  // apollo server configuration
  const server = new ApolloServer({
    schema,
    formatError: (error: any) => {
      // Access the error code from the extensions field
      return {
        status: error.extensions.status
          ? error.extensions.status
          : statusCodes.SERVER_ERROR,
        message: error.message,
        code: error.extensions.code || "INTERNAL_SERVER_ERROR",
        path: error.path,
      };
    },
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
