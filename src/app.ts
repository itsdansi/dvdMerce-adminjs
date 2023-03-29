import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";

import * as AdminJSPrisma from "@adminjs/prisma";
import {PrismaClient} from "@prisma/client";
import {DMMFClass} from "@prisma/client/runtime";
// import {router} from "./routes/index"
import router from "./routes/index";

const prisma = new PrismaClient();

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  const app = express();

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
};

start();
