import { Client, Project } from "@prisma/client";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLError,
  GraphQLEnumType,
} from "graphql";
import { MyContext } from "../context";
import { db } from "../utils/db";

const ProjectType = new GraphQLObjectType<Project, MyContext>({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    client: {
      type: ClientType,
      async resolve(project, args, ctx) {
        return ctx.clientLoader.load(project.clientId);
        // return db.client.findUnique({
        //   where: { id: project.clientId },
        // });
      },
    },
  }),
});

const ClientType = new GraphQLObjectType<Client, MyContext>({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    projects: {
      type: new GraphQLNonNull(new GraphQLList(ProjectType)),
      async resolve(client, args, ctx) {
        // return ctx.projectLoader.load(client.id);
        return db.project.findMany({ where: { clientId: client.id } });
      },
    },
  }),
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve(parent, args) {
        return "world";
      },
    },
    projects: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(ProjectType))
      ),
      async resolve(parent, args) {
        return db.project.findMany();
      },
    },
    project: {
      type: new GraphQLNonNull(ProjectType),
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return db.project.findUnique({ where: { id: args.id } });
      },
    },
    clients: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ClientType))),
      async resolve() {
        return db.client.findMany();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return db.client.findUnique({ where: { id: args.id } });
      },
    },
  },
});

const ProjectStatus = new GraphQLEnumType({
  name: "ProjectStatus",
  values: {
    new: { value: "Not Started" },
    progress: { value: "In Progress" },
    completed: { value: "Completed" },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: new GraphQLNonNull(ClientType),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        return db.client.create({
          data: {
            name: args.name,
            email: args.email,
            phone: args.phone,
          },
        });
      },
    },
    deleteClient: {
      type: new GraphQLNonNull(ClientType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        return db.client
          .delete({ where: { id: args.id } })
          .catch((err) => new GraphQLError("Client not found"));
      },
    },
    addProject: {
      type: new GraphQLNonNull(ProjectType),
      args: {
        clientId: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(ProjectStatus) },
      },
      async resolve(parent, args) {
        return db.project.create({
          data: {
            name: args.name,
            description: args.description,
            status: args.status,
            clientId: args.clientId,
          },
        });
      },
    },
    updateProject: {
      type: new GraphQLNonNull(ProjectType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: ProjectStatus },
      },
      async resolve(parent, args) {
        return db.project
          .update({
            where: { id: args.id },
            data: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          })
          .catch((err) => new GraphQLError("Client not found."));
      },
    },
    deleteProject: {
      type: new GraphQLNonNull(ProjectType),
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args) {
        return db.project
          .delete({ where: { id: args.id } })
          .catch((err) => new GraphQLError("Project no found!"));
      },
    },
  },
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

export default schema;
