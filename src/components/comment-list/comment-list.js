import { Stack } from '@chakra-ui/react';
import Comment from '../comment/comment';

const CommentList = ({ items }) => {
  return (
    <Stack>
      {items.map(({ _id, name, text }) =>
        <Comment key={_id} name={name} text={text} />
      )}
    </Stack>
  );
};

export default CommentList;
