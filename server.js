const express = require("express");
const expressGraphQL = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
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

//Song type for root query
const SongType = new GraphQLObjectType({
  name: "Song",
  description: "This represents a song written by an artist",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    artistId: { type: GraphQLNonNull(GraphQLInt) },
    artist: {
      type: ArtistType,
      resolve: (song) => {
        return artists.find((artist) => artist.id === song.artistId);
      },
    },
  }),
});

const ArtistType = new GraphQLObjectType({
  name: "Artist",
  description: "This represents an artist of a song",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    songs: {
      type: GraphQLList(SongType),
      resolve: (artist) => {
        return songs.filter((song) => song.artistId === artist.id);
      },
    },
  }),
});

//Root query scope, everything is pulled down from here, so you can query all objects from here
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    song: {
      type: SongType,
      description: "One Song",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => songs.find((song) => song.id === args.id),
    },
    songs: {
      type: new GraphQLList(SongType),
      description: "List of All Songs",
      resolve: () => songs,
    },
    artist: {
      type: ArtistType,
      description: "One Artist",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        artists.find((artist) => artist.id === args.id),
    },
    artists: {
      type: new GraphQLList(ArtistType),
      description: "List of All Artist",
      resolve: () => artists,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);
app.listen(5000, () => console.log("This server is running successful!"));
