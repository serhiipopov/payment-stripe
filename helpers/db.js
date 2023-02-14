import { MongoClient } from 'mongodb';

export const MONGO_URL = 'mongodb+srv://serhii3001:aT82hHlTExxS4p5L@cluster0.me33jvi.mongodb.net/mobile?retryWrites=true&w=majority';

export async function connectDatabase() {
  return await MongoClient.connect(MONGO_URL);
}

export async function insertDocument(client, document) {
  const db = client.db();

  return await db.collection('newsletter').insertOne(document);
}
