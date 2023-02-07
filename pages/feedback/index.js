import { buildFeedbackPath, extractFeedback } from '../../helpers';
import Button from '../../src/components/ui/button'
import { Box, Container, Flex, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

const FeedbackPage = (props) => {
  const { feedbackItems } = props;
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedbackHandler = (id) => {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback)
      })
  }

  return (
    <Container px={'12'} py={'32'}>
      <Stack spacing='4'>
        {feedbackItems.map((item) => (
          <Flex justifyContent='space-between' alignItems='center' key={item.id}>
            <Box>
              {feedbackData && <Text>{feedbackData?.name}</Text>}
              <Text>{item.text}</Text>
            </Box>
            <Button onClick={() => loadFeedbackHandler(item.id)}>show details</Button>
          </Flex>
        ))}
      </Stack>
    </Container>
  );
};

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    }
  }
}

export default FeedbackPage;
