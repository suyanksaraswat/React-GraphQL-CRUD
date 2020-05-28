const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

let entries = [];

const typeDefs = gql`
  type Entry {
  	accountName: String
	amount: String
	date: String
  }
  type Query {
    entries: [Entry]!
  }
  type Mutation {
    createEntry(accountName: String!, amount: String!, date: String!):String
  }
`;

const resolvers = {
	Query: {
		entries: () => entries,
	},
	Mutation: {
		createEntry: (parent, args, context, info) => {

			return entries.push({
				accountName: args.accountName,
				amount: args.amount,
				date: args.date
			});
		},
	}
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.use(cors());

app.listen({ port: 4000 }, () =>
	console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
