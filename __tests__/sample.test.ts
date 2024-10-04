import * as schema from "../src/server/db/schema";
import { appRouter } from "~/server/api/root";

describe("test", () => {
  test("it should return true", () => {
    console.log(schema.accounts);

    console.log(appRouter.user);
    expect(true).toBe(true);
  });
});
