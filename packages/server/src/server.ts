import express, { Application } from "express";
import session from "express-session";

import sequelize from "./sequelize";
import routes from "./routes";

const FileStore = require("session-file-store")(session);

const app: Application = express();

const sessionMiddleware = session({
  secret: "kakaonibs",
  saveUninitialized: true,
  cookie: { secure: false }, // one day
  resave: false,
  store: new FileStore(),
});

app.use(sessionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: true });

app.use("/", routes);

app.listen(8000, () => {
  console.log("start");
});
