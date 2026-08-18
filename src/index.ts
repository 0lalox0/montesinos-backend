import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
const baseUrl = "https://angular.dev/assets/images/tutorials/common";

const houses = [
  {
      id: "0",
      name: "Viene de Apollo via GraphQL",
      city: "Chicago",
      state: "IL",
      photo: `${baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
      availableUnits: 4,
      wifi: true,
      laundry: true,
    },
    {
      id: "1",
      name: "A113 Transitional Housing",
      city: "Santa Monica",
      state: "CA",
      photo: `${baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
      availableUnits: 0,
      wifi: false,
      laundry: true,
    },
    {
      id: "2",
      name: "Warm Beds Housing Support",
      city: "Juneau",
      state: "AK",
      photo: `${baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
      availableUnits: 1,
      wifi: false,
      laundry: false,
    },
    {
      id: "3",
      name: "Homesteady Housing",
      city: "Chicago",
      state: "IL",
      photo: `${baseUrl}/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
      availableUnits: 1,
      wifi: true,
      laundry: false,
    },
    {
      id: "4",
      name: "Happy Homes Group",
      city: "Gary",
      state: "IN",
      photo: `${baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
      availableUnits: 1,
      wifi: true,
      laundry: false,
    },
    {
      id: "5",
      name: "Hopeful Apartment Group",
      city: "Oakland",
      state: "CA",
      photo: `${baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
      availableUnits: 2,
      wifi: true,
      laundry: true,
    },
    {
      id: "6",
      name: "Seriously Safe Towns",
      city: "Oakland",
      state: "CA",
      photo: `${baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
      availableUnits: 5,
      wifi: true,
      laundry: true,
    },
    {
      id: "7",
      name: "Hopeful Housing Solutions",
      city: "Oakland",
      state: "CA",
      photo: `${baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,
      availableUnits: 2,
      wifi: true,
      laundry: true,
    },
    {
      id: "8",
      name: "Seriously Safe Towns",
      city: "Oakland",
      state: "CA",
      photo: `${baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
      availableUnits: 10,
      wifi: false,
      laundry: false,
    },
    {
      id: "9",
      name: "Capital Safe Towns",
      city: "Portland",
      state: "OR",
      photo: `${baseUrl}/webaliser-_TPTXZd9mOo-unsplash.jpg`,
      availableUnits: 6,
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
