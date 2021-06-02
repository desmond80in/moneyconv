import express from "express";
import bodyParser from "body-parser";
import { ApolloServer, gql, AuthenticationError } from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { makeExecutableSchema } from "graphql-tools";
import userRegistration from "./routes/userRegistration";
import userLogin from "./routes/userLogin";

const { Auth, validateRoute } = require("./auth");
const Redis = require("ioredis");
const crypto = require("crypto");
const cors = require("cors");
const secretKey = "secretKey";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const gqlPORT = process.env.GQL_PORT || 4000;
const gqlPATH = process.env.GQL_PATH || "/graphql";
const gqlURL = process.env.GQL_URL || "http://localhost";

const webAPPURL = process.env.WEB_APP_URL || "http://localhost";
const webAPPPort = process.env.WEB_APP_PORT || 3000;

const redisPORT = process.env.REDIS_PORT || "19760";
const redisENDPOINT =
  process.env.REDIS_ENDPOINT ||
  "redis-19760.c251.east-us-mz.azure.cloud.redislabs.com";
const redisPASSWORD =
  process.env.REDIS_PASSWORD || "E0WRtfau47LclMRSMVA6MyF36d1GB4i8";

const app = express();
app.use(express.json());

////////////////////////////////////////// -----Cros----- ///////////////////////////////////////////
var corsOptions = {
  origin: `${webAPPURL}:${webAPPPort}`,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors());

/////////////////////////////////////////// ----Redis---- ///////////////////////////////////////////

const redis = new Redis({
  host: redisENDPOINT,
  port: redisPORT,
  password: redisPASSWORD,
});

/////////////////////////////////////////// ----Redis---- ///////////////////////////////////////////

/////////////////////////////////////////// ----JWT---- ///////////////////////////////////////////

app.post("/api/register", async (req, res, next) => {
  await userRegistration(req, res, redis);
  next();
});

// login
app.post("/api/login", async (req, res, next) => {
  await userLogin(req, res, redis);
  next();
});
/////////////////////////////////////////// ----JWT---- ///////////////////////////////////////////

/////////////////////////////////////////// ----gQL---- ///////////////////////////////////////////

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authReq = Auth(req);
    return { auth: authReq, redis };
  },
});

server.applyMiddleware({ app, gqlPATH });

/////////////////////////////////////////// ----gQL---- ///////////////////////////////////////////
app.listen({ port: gqlPORT }, () =>
  console.log(`Server ready at ${gqlURL}:${gqlPORT}${server.graphqlPath}`)
);
