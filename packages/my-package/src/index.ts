import { databaseClient } from "domain/db";

export const abc = databaseClient.collections.users
  .getDocument("abc")
  .then((d) => d?.name);
