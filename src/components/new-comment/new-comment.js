import { Grid, Input, Stack, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import Button from '../ui/button/button';

const NewComment = ({ onAddComment }) => {
  const [setIsInvalid] = useState(false)
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    text: '',
  })
  const { email, name, text } = formFields

  const sendCommentHandler = (e) => {
    e.preventDefault()

    if (
      !email.includes('@') ||
      !name ||
      name.trim === '' ||
      !text ||
      text.trim === ''
    ) {
      setIsInvalid(true)
      return
    }

    onAddComment({ email, name, text })
  }

  const formHandler = (event) => {
    const { id, value } = event.target;
    setFormFields({ ...formFields, [id]: value });
  }

  return (
    <>
      <form onSubmit={sendCommentHandler}>
        <Stack
          spacing='4'
          borderColor='gray.200'
          borderWidth='1px'
          borderRadius='lg'
          bg='gray.200'
          p='4'
        >

          <Grid gap='3' templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}>
            <Input
              id='email'
              type='email'
              placeholder='Your email'
              value={email}
              onChange={formHandler}
              bg='gray.50'
            />
            <Input
              id='name'
              type='text'
              placeholder='Your name'
              value={name}
              onChange={formHandler}
              bg='gray.50'
            />
          </Grid>

          <Textarea
            id='text'
            type='text'
            rows={4}
            placeholder='Your comment'
            value={text}
            onChange={formHandler}
            bg='gray.50'
          />
          <Button disabled={!name || !text || !email} type='submit'>Send</Button>
        </Stack>

      </form>
    </>
  );
};

export default NewComment;
