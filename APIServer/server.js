
import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';
import { makeExecutableSchema } from "graphql-tools";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

const Redis = require('ioredis');
const crypto = require('crypto');

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 4000;
const path = '/graphql';

const app = express();
app.use(express.json());

app.get('/comments', (req, res) => {
    res.json('All comments')
})


/////////////////////////////////////////// ----Redis---- ///////////////////////////////////////////

const redis = new Redis({
    host: 'redis-19760.c251.east-us-mz.azure.cloud.redislabs.com',
    port: 19760,
    password: 'E0WRtfau47LclMRSMVA6MyF36d1GB4i8'
});

(async () => {
    const reply = await redis.get('foo',);
    console.log(reply);
})();


/////////////////////////////////////////// ----Redis---- ///////////////////////////////////////////



/////////////////////////////////////////// ----JWT---- ///////////////////////////////////////////

app.post('/api/register', async(req,res) => {  
  const user = req.body;

  if(!user.password || !user.username ){
    return res.status(400).send({message: 'Invalid user data'});
  }
  
  let userResult = await redis.get(user.username);
  if(userResult){
    return res.status(401).send({message: 'Username already exits'});
  }

  var hPassword = crypto.createHash('md5').update(user.password).digest("hex");
  console.log('hPassword', hPassword);

  await redis.set(user.username, hPassword);
  return res.status(201).send({message: "User created successfully"});

})


// login
app.post('/api/login',async (req,res)=> {

  const user = req.body;
  console.log('user ', user)
  if(!user.password || !user.username ){
    return res.status(400).send({message: 'Invalid username or password'});
  }

  let userResult = await redis.get(user.username);
  if(!userResult){
    return res.status(400).send({message: 'Invalid username or password'});
  }

  var hPassword = crypto.createHash('md5').update(user.password).digest("hex");

  if(hPassword === userResult.password){
    return res.status(400).send({message: 'Invalid username or password'});
  }  

  jwt.sign({ user }, 'secretKey',( err, token) => {
    console.log('token',token)
    res.json({ token });
  });
})


const verifyToken = (req, res, next )=>{
  
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.get('/api/protected', verifyToken, (req, res)=>{

  console.log('token', req.token);
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
})


/////////////////////////////////////////// ----JWT---- ///////////////////////////////////////////


const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: {redis}
});

server.applyMiddleware({ app, path });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
        