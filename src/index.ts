import fastify from "fastify";
import userRouter from "./routes/user.router";
import "dotenv/config";
import { initDB } from "./db/initDB";

const port = 5000;

const startServer = async () => {
  try {
    await initDB();
    console.log("Database connected");
  } catch (e) {
    console.error(e);
  }
  try {
    const server = fastify();

    const errorHandler = (error: any, address: any) => {
      console.error(error, address);
    };

    server.register(userRouter, { prefix: "/api/user" });

    await server.listen({ port }, errorHandler);
  } catch (e) {
    console.error(e);
  }
};

process.on("unhandledRejection", (e) => {
  console.error(e);
  process.exit(1);
});

startServer();
