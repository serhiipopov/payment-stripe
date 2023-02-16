import { useEffect, useState } from 'react';
import { method } from '../../constants';
import { Box, Stack } from '@chakra-ui/react';
import Button from '../ui/button/button';
import CommentList from '../comment-list/comment-list';
import NewComment from '../new-comment/new-comment';

const Comments = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch(`/api/comments/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments)
      })
  },[showComments])

  const toggleCommentsHandler = () => setShowComments(prevState => !prevState)

  const addCommentHandler = (commentData) => {
    fetch(`/api/comments/${eventId}`, {
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
        <Button onClick={toggleCommentsHandler}>
          {showComments ? 'Hide' : 'Show'} Comments
        </Button>
        {showComments && <NewComment onAddComment={addCommentHandler} />}
        {showComments && <CommentList items={comments} />}
      </Stack>
    </Box>
  );
};

export default Comments;
