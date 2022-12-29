import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { clientLoader, projectLoader } from "./loaders";
import { MyContext } from "./context";
import { db } from "./utils/db";
import schema from "./schema";

const startServer = async () => {
  const server = new ApolloServer<MyContext>({
    schema: schema,
    includeStacktraceInErrorResponses: false,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => ({
      clientLoader,
      projectLoader,
    }),
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startServer()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
