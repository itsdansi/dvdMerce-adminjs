import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";

import * as AdminJSPrisma from "@adminjs/prisma";
import {PrismaClient} from "@prisma/client";
import {DMMFClass} from "@prisma/client/runtime";
// import {router} from "./routes/index"
import router from "./routes/index";

import * as errorHandler from "./middlewares/errorHandler";
import {applyMiddleware} from "./middlewares/method-interceptor";

const prisma = new PrismaClient();

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  const app = express();

  applyMiddleware(prisma);

  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  const admin = new AdminJS({});

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use("/", router);
  app.use(admin.options.rootPath, adminRouter);

  // redirect to routes/index.js
  // const route = require("./routes");

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
  });

  // errorhandlers;
  app.use(errorHandler.genericErrorHandler);
  app.use(errorHandler.notFound);
  app.use(errorHandler.errorHandler);

  // Catch unhandled rejections
  process.on("unhandledRejection", (err: Error) => {
    console.error("Unhandled rejection --->", err);
  });

  // Catch uncaught exceptions
  process.on("uncaughtException", (err: Error) => {
    console.error("Uncaught exception", err);
  });
};

start();
