import { createRouter } from "server/createRouter";

import * as z from "zod";

export default createRouter().query("hello", {
  input: z
    .object({
      name: z.string().nonempty(),
    })
    .required(),
  resolve({ input }) {
    return {
      message: `Hello, ${input.name}!`,
    };
  },
});
