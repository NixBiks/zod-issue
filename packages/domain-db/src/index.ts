import { DatabaseClient } from "firestore-zod";
import { mySchema } from "validators";

const databaseClient = new DatabaseClient({
  users: { collectionId: "users", validationSchema: mySchema },
});

export { databaseClient };
