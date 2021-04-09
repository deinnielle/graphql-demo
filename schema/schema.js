const graphql = require("graphql");
const Service = require("../models/service");
const Project = require("../models/project");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    additionalInfo: { type: GraphQLString },
    service: {
      type: ServiceType,
      resolve(parent, args) {
        return Service.findById(parent.serviceID);
      },
    },
  }),
});

const ServiceType = new GraphQLObjectType({
  name: "Service",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    dailyRate: { type: GraphQLInt },
    // project: {
    //   type: new GraphQLList(ProjectType),
    //   resolve(parent, args) {
    //     return Project.findById({ serviceID: parent.id });
    //   },
    // },
  }),
});

const Query = new GraphQLObjectType({
  name: "Get",
  fields: {
    getProject: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },

    getProjects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({});
      },
    },

    getService: {
      type: ServiceType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Service.findById(args.id);
      },
    },

    getServices: {
      type: new GraphQLList(ServiceType),
      resolve(parent, args) {
        return Service.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Post",
  fields: {
    addService: {
      type: ServiceType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        dailyRate: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let service = new Service({
          name: args.name,
          description: args.description,
          dailyRate: args.dailyRate,
        });
        return service.save();
      },
    },

    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        additionalInfo: { type: GraphQLString },
        serviceID: { type: GraphQLID },
      },
      resolve(parent, args) {
        let project = new Project({
          name: args.name,
          description: args.description,
          additionalInfo: args.additionalInfo,
          serviceID: args.serviceID,
        });
        return project.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
