import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';

const ModalCustom = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p='2'>
        <ModalCloseButton/>
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalCustom;
