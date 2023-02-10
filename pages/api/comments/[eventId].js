import { method } from '../../../src/constants';

function handler(req, res) {
  const eventId = req.query.eventId;
  if (req.method === method.POST) {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim === '' ||
      !text ||
      text.trim === ''
    ) {
      res.status(422).json({ message: 'Invalid input!' })
      return
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    }

    res.status(201).json({ message: 'Added comment', comment: newComment })
  }

  if (req.method === method.GET) {
    const dummyComments = [
      { id: '1', name: 'Serhii', text: 'A first comment!' },
      { id: '2', name: 'Max', text: 'A second comment!' },
    ];

    res.status(201).json({ comments: dummyComments })
  }
}

export default handler;
