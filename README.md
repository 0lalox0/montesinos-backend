# Montesinos Backend

API GraphQL para el listado de propiedades de [Montesinos Propiedades](https://github.com/0lalox0/AngularProject). Construida con **Apollo Server** y **TypeScript**.

🔗 Frontend: [AngularProject](https://github.com/0lalox0/AngularProject)

## Stack

- **Apollo Server** (`@apollo/server`) — servidor GraphQL standalone
- **GraphQL**
- **TypeScript**
- **Node.js**

## Schema

```graphql
type Query {
  getHouses: [House]
  getHouseById(id: ID!): House
}

type Mutation {
  createHouse(
    name: String!
    city: String!
    state: String!
    photo: String
    availableUnits: Int
    wifi: Boolean
    laundry: Boolean
  ): House
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
```

Los datos se guardan en memoria (un array dentro de `src/index.ts`), pensado como proyecto de aprendizaje: no persiste entre reinicios del servidor.

## Requisitos previos

- Node.js 20+
- npm 10+

## Instalación

```bash
git clone https://github.com/0lalox0/montesinos-backend.git
cd montesinos-backend
npm install
```

## Desarrollo / ejecución

```bash
npm start
```

Compila TypeScript (`tsc`) y levanta el servidor. Por defecto escucha en el puerto `4000`, o el que definas en la variable de entorno `PORT`.

```bash
PORT=5000 npm start
```

Al arrancar, la consola muestra la URL del playground de Apollo, por ejemplo:

```
🚀  Server ready at: http://localhost:4000/
```

Desde ahí podés probar las queries y mutations directamente en el Apollo Sandbox.

## Build

```bash
npm run build
```

Compila el proyecto a `dist/` sin levantar el servidor.

## Ejemplo de query

```graphql
query {
  getHouses {
    id
    name
    city
    state
    availableUnits
  }
}
```

## Ejemplo de mutation

```graphql
mutation {
  createHouse(
    name: "Nueva Propiedad"
    city: "La Plata"
    state: "Buenos Aires"
    availableUnits: 3
    wifi: true
    laundry: true
  ) {
    id
    name
  }
}
```

## Estructura del proyecto

```
src/
└── index.ts    # Servidor Apollo, schema, resolvers y datos en memoria
```

## Roadmap / próximas mejoras

- Persistencia real (base de datos) en vez de array en memoria.
- Separar schema, resolvers y datos en módulos propios.
- Validación de inputs en las mutations.
- Manejo de errores GraphQL (`GraphQLError` con códigos y mensajes claros).
- Tests de resolvers.

## Autor

[Ladislao Bordón](https://github.com/0lalox0) — [LinkedIn](https://linkedin.com/in/ladislao-bordon/)
