import Link from 'next/link';
import { Button } from '@chakra-ui/react';

const CustomButton = ({ 
  onClick, 
  link,
  children,
  ...props
}) => {
  if (link) {
    return (
      <Link href={link}>{children}</Link>
    )
  }

  return (
    <Button size='lg' onClick={onClick} {...props}>
      {children}
    </Button>
  )
};

export default CustomButton;
