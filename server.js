const express = require("express");
const expressGraphQL = require("express-graphql");
const app = express();

//setting up my own database, not using api yet.
const artists = [
  { id: 1, name: "Jay-Z" },
  { id: 2, name: "JCole" },
  { id: 3, name: "Drake" },
];

const songs = [
  { id: 1, name: "Empire State of Mind", artistId: 1 },
  { id: 2, name: "Cant Knock The Hustle", artistId: 1 },
  { id: 3, name: "Where Im From", artistId: 1 },
  { id: 4, name: "Shes Mine", artistId: 2 },
  { id: 5, name: "2face", artistId: 2 },
  { id: 6, name: "ATM", artistId: 2 },
  { id: 7, name: "Best I Ever Had", artistId: 3 },
  { id: 8, name: "Hotline Bling", artistId: 3 },
  { id: 9, name: "Toosie Slide", artistId: 3 },
];

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    songs: {
      type: SongType,
      description: "List of All Songs",
      resolve: () => songs,
    },
  }),
});

app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
  })
);
app.listen(5000, () => console.log("This server is running successful!"));
