import { Box, Input, Stack, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import Button from '../ui/button';

const FeedbackForm = () => {
  const [feedbackItems, setFeedbackItems] = useState([])
  const [formFields, setFormFields] = useState({
    name: '',
    text: '',
  })

  const formHandler = (event) => {
    const {id, value} = event.target;
    setFormFields({...formFields, [id]: value});
  }

  const submitFormHandler = (event) => {
    event.preventDefault();
    const reqBody = {name: formFields.name, text: formFields.text}

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))

  }

  const loadFeedbackHandler = () => {
    fetch('/api/feedback')
      .then((res) => res.json())
      .then((data) => {
        setFeedbackItems(data.feedback)
      })
  }
  
  return (
    <Box w='35%'>
      <form onSubmit={submitFormHandler}>
        <Stack spacing='2'>
          <Input
            id='name'
            type='name'
            placeholder='your name'
            value={formFields.name}
            onChange={formHandler}
          />
          <Textarea
            id='text'
            type='text'
            rows={4}
            placeholder='feedback'
            value={formFields.text}
            onChange={formHandler}
          />
          <Button type='submit'>send</Button>

          <Button onClick={loadFeedbackHandler}>load feedback</Button>
          <>
            {feedbackItems.map((item) => (
              <Stack spacing='2' key={item.id}>
                <Text>{item.text}</Text>
              </Stack>
            ))}
          </>

        </Stack>
      </form>
    </Box>
  );
};

export default FeedbackForm;
