
import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';
import { makeExecutableSchema } from "graphql-tools";
import userRegistration from './routes/userRegistration';
import userLogin from './routes/userLogin';

const {Auth,validateRoute} = require('./auth');
const Redis = require('ioredis');
const crypto = require('crypto');
const secretKey =  'secretKey';
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 4000;
const path = '/graphiql';

const app = express();
app.use(express.json());

/////////////////////////////////////////// ----Redis---- ///////////////////////////////////////////

const redis = new Redis({
    host: 'redis-19760.c251.east-us-mz.azure.cloud.redislabs.com',
    port: 19760,
    password: 'E0WRtfau47LclMRSMVA6MyF36d1GB4i8'
});

/////////////////////////////////////////// ----Redis---- ///////////////////////////////////////////



/////////////////////////////////////////// ----JWT---- ///////////////////////////////////////////

app.post('/api/register', async(req,res, next)=> {
  await userRegistration(req,res,redis);
  next();
})

// login
app.post('/api/login',async (req,res, next)=> {
  await userLogin(req,res,redis);
  next();
})
/////////////////////////////////////////// ----JWT---- ///////////////////////////////////////////


const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({req})=>{
      const authReq = Auth(req);
      return {auth: authReq, redis}
    }
});

server.applyMiddleware({ app, path });

app.listen({ port: PORT }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)
        