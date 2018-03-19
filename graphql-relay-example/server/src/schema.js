/*const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString} = require('graphql');

const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);

fetch('https://www.w3schools.com/xml/cd_catalog.xml').then(response => response.text()).then(parseXML);

const CDType = new GraphQLObjectType({
    name: 'CD',
    description: 'cd',

    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: xml => xml.CATALOG.CD[0].TITLE[0]
        }
    })
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'query',

        fields: () => ({
            cd: {
                type: CDType,
                args: {
                    id: {type: GraphQLInt}
                },
                resolve: (root, args) => fetch('https://www.w3schools.com/xml/cd_catalog.xml').then(response => response.text()).then(parseXML)
            }
        })
    })
});*/

/**
 * The above is an example of defining graphql schema. However if we want to use graphql-tools to create a GraphQL we use the
 * makeExecutableSchema method which takes a language String and resolver functions. This is the language string representation
 */

module.exports = `
    interface Node {
        id: ID!
    }

    type PageInfo {
        # When paginating forwards, are there more items?
        hasNextPage: Boolean,
        
        # When paginating backwards, are there more items?
        hasPreviousPage: Boolean,
        
        # When paginating backwards, the cursor to continue.
        startCursor: String,
        
        # When paginating forwards, the cursor to continue.
        endCursor: String
    }

    type User {
        name: String!
    }

    type Post implements Node {
        id: ID!,
        description: String!
        imageUrl: String!,
    }

    type PostEdge {
        node: Post,

        cursor: String!
    }

    type PostConnection {
        pageInfo: PageInfo!,

        edges: [PostEdge]
    }

    type Viewer {
        allPosts(last: Int): PostConnection
        id: ID!
      }

    type Query{
        viewer: Viewer!

        node(
            id: ID!
        ): Node
    }

    input CreatePostInput {
        description: String!,
        imageUrl: String!
    }

    type CreatePostPayload {
        viewer: Viewer!,
        clientMutationId: String!,
        post: PostEdge
    }

    input DeletePostInput {
        id: ID!
    }

    type DeletePostPayload {
        deletedId: ID
    }

    type Mutation {
        createPost(input: CreatePostInput!): CreatePostPayload!
        deletePost(input: DeletePostInput!): DeletePostPayload!
    }
`;
