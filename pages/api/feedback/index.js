import fs from 'fs';
import { buildFeedbackPath, extractFeedback } from '../../../helpers';

const handler = (req, res) => {
  if (req.method === 'POST') {
    const name = req.body.name
    const feedbackText = req.body.text

    const newFeedback = {
      id: new Date().toISOString(),
      name: name,
      text: feedbackText,
    }

    // store that in a database or in a file
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Success!', feedback: newFeedback });

  } else {
    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data })
  }
}

export default handler;
