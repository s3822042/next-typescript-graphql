import { makeSchema } from "nexus";
import * as path from "path";

export const schema = makeSchema({
  types: [],
  outputs: {
    schema: path.join(process.cwd(), "graphql/schema.graphql"),
    typegen: path.join(process.cwd(), "graphql/generated/nexus.d.ts"),
  },
  contextType: {
    module: path.join(process.cwd(), "graphql/context.ts"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "",
        alias: "db",
      },
    ],
  },
});
