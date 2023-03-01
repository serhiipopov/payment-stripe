import { MongoClient } from 'mongodb';

const env = process.env;

export const connectingUrl = `mongodb+srv://${env.USERNAME}:${env.PASSWORD}@${env.CLUSTERNAME}.me33jvi.mongodb.net/${env.DATABASE}?retryWrites=true&w=majority`;

export async function connectDatabase() {
  return await MongoClient.connect(connectingUrl);
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db()

  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray()

  return documents;
}
