import path from 'path';
import fs from 'fs';

export const buildFeedbackPath = () => path.join(process.cwd(), 'data', 'events.json');

export const extractFeedback = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const data =  JSON.parse(fileData.toString());
  return data;
}
