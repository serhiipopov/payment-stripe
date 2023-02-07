import Link from 'next/link';
import { Button } from '@chakra-ui/react';

const CustomButton = ({ 
  onClick, 
  link, 
  disabled, 
  type,
  children 
}) => {
  if (link) {
    return (
      <Link href={link}>{children}</Link>
    )
  }

  return (
    <Button disabled={disabled} type={type} size='lg' onClick={onClick}>{children}</Button>
  )
};

export default CustomButton;
