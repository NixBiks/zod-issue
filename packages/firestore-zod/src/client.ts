import { DocumentCollection } from "./helpers";
import { initializeApp, getApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { z } from "zod";

export class DatabaseClient<
  CollectionDescription extends Record<
    string,
    { collectionId: string; validationSchema: z.Schema<{ [k: string]: any }> }
  >
> {
  collections: {
    [K in keyof CollectionDescription]: DocumentCollection<
      CollectionDescription[K]["validationSchema"]
    >;
  };
  collectionDescriptions: CollectionDescription;

  constructor(collectionDescriptions: CollectionDescription) {
    this.collections = {} as {
      [K in keyof CollectionDescription]: DocumentCollection<
        CollectionDescription[K]["validationSchema"]
      >;
    };
    this.collectionDescriptions = collectionDescriptions;
  }

  initialize({
    name,
    ...config
  }: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
    name?: string;
  }) {
    let app: FirebaseApp;
    name = name || "main";
    try {
      app = initializeApp(config, name);
      console.log(
        `Initializing DatabaseClient '${name}' with config: ${JSON.stringify(
          config
        )}`
      );
    } catch {
      app = getApp(name);
    }
    const firestore = getFirestore(app);
    this.collections = Object.keys(this.collectionDescriptions).reduce(
      (obj, key) => {
        obj[key as keyof CollectionDescription] = new DocumentCollection({
          collectionId: this.collectionDescriptions[key].collectionId,
          firestore,
          validationSchema: this.collectionDescriptions[key].validationSchema,
        });
        return obj;
      },
      {} as {
        [K in keyof CollectionDescription]: DocumentCollection<
          CollectionDescription[K]["validationSchema"]
        >;
      }
    );
  }
}
