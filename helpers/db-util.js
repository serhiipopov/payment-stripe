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

export async function findOneValue(client, collection, value) {
  const db = client.db();

  return await db.collection(collection).findOne(value);
}

export async function getAllDocuments(client, collection, productId, sort) {
  const db = client.db()

  const documents = await db
    .collection(collection)
    .find(productId)
    .sort(sort)
    .toArray()

  return documents;
}

export async function  updateOneValue(client, collection, ...updateItem) {
  const db = client.db();

  return await db.collection(collection).updateOne(...updateItem);
}
