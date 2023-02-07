import Link from 'next/link';
import { Button } from '@chakra-ui/react';

const CustomButton = ({ onClick, link, type, children }) => {
  if (link) {
    return (
      <Link href={link}>{children}</Link>
    )
  }

  return (
    <Button type={type} size='lg' onClick={onClick}>{children}</Button>
  )
};

export default CustomButton;
