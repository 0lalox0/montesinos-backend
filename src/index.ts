import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const houses = [
  {
    id: "1",
    name: "Casa Montoya",
    city: "Santa Fe",
    state: "NM",
    photo: "https://example.com/photos/casa-montoya.jpg",
    availableUnits: 3,
    wifi: true,
    laundry: false,
  },
  {
    id: "2",
    name: "La Residencia",
    city: "Albuquerque",
    state: "NM",
    photo: "https://example.com/photos/la-residencia.jpg",
    availableUnits: 1,
    wifi: true,
    laundry: true,
  },
  {
    id: "3",
    name: "El Nido",
    city: "Taos",
    state: "NM",
    photo: "https://example.com/photos/el-nido.jpg",
    availableUnits: 2,
    wifi: false,
    laundry: true,
  },
  {
    id: "4",
    name: "Pueblo Verde",
    city: "Las Cruces",
    state: "NM",
    photo: "https://example.com/photos/pueblo-verde.jpg",
    availableUnits: 4,
    wifi: true,
    laundry: true,
  },
];

const typeDefs = `
    type Query {
      getHouses: [House]
      getHouseById(id: ID!): House
    }
    type Mutation {
      createHouse(name: String!, city: String!, state: String!, photo: String, availableUnits: Int, wifi: Boolean, laundry: Boolean): House
    }
    type House {
      id: ID!
      name: String
      city: String
      state: String
      photo: String
      availableUnits: Int
      wifi: Boolean
      laundry: Boolean
    }
`;
const resolvers = {
  Query: {
    getHouses: () => {
      return houses;
    },
    getHouseById: (_parent: unknown, args: { id: string }) => {
      return houses.find((house) => house.id === args.id);
    },
  },
  Mutation: {
    createHouse: (
      _parent: unknown,
      args: {
        name: string;
        city: string;
        state: string;
        photo?: string;
        availableUnits?: number;
        wifi?: boolean;
        laundry?: boolean;
      },
    ) => {
      const newHouse = {
        id: String(houses.length + 1),
        name: args.name,
        city: args.city,
        state: args.state,
        photo: args.photo || "",
        availableUnits: args.availableUnits || 0,
        wifi: args.wifi || false,
        laundry: args.laundry || false,
      };
      houses.push(newHouse);
      return newHouse;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
