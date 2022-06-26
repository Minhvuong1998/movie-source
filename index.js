import "dotenv/config.js";
import express from "express";
import passport from "passport";

import { InitiateMongoServer } from "./datasources/index.js";
import { initLocalPassport } from "./strategies/index.js";
import { vars } from "./configs/index.js";

import route from "./routes/index.js";

const PORT = vars.port;

InitiateMongoServer();

const app = express();
initLocalPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
