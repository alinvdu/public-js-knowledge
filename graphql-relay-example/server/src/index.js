const express  = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
autoIncrement = require('mongoose-auto-increment');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

mongoose.connect('mongodb://localhost:27017/graphql');
autoIncrement.initialize(mongoose.connection);

const User = require('./models/user');
const Post = require('./models/post');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const app = express();
app.use('/graphql', cors(), bodyParser.json(), graphqlHTTP({
    schema,
    context: {
        User,
        Post
    }
}));

app.use('/graphiql', graphqlHTTP({endpointURL: '/graphql', graphiql: true}));

app.listen(4000);
console.log('listening...');