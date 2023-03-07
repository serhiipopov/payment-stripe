import { useEffect, useState } from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';
import CommentList from '../comment-list/comment-list';
import NewComment from '../new-comment/new-comment';
import { apiRoutes, method } from '../../constants';

const Comments = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch(`${apiRoutes.comments}/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments)
      })
  },[showComments])

  const toggleCommentsHandler = () => setShowComments(prevState => !prevState)
  const countComments = comments.length

  const addCommentHandler = (commentData) => {
    fetch(`${apiRoutes.comments}/${eventId}`, {
      method: method.POST,
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  return (
    <Box w='45%'>
      <Stack spacing='4'>
        <Text fontSize='xl' fontWeight='bold' textAlign='center'>Add comment</Text>
        <NewComment onAddComment={addCommentHandler} />
        <Text
          color='cyan.700'
          _hover={{ color: 'cyan.500' }}
          fontSize='xl'
          fontWeight='bold'
          as='button'
          onClick={toggleCommentsHandler}
        >
          {showComments ? 'Hide' : 'Show'} Comments
        </Text>

        {!countComments && showComments &&
          <Text fontSize='xl' fontWeight='medium' textAlign='center'>There are no comments</Text>
        }
        {showComments && <CommentList items={comments} />}

      </Stack>
    </Box>
  );
};

export default Comments;
