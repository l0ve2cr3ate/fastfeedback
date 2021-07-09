import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

import { useAuth } from "@/lib/auth";
import { createSite } from "@/lib/db";

const AddSiteModal = ({ children }) => {
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, control } = useForm();
  const toast = useToast();

  const onCreateSite = ({ name, url }) => {
    createSite({
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    });
    toast({
      title: "Success!",
      description: "We have added your site.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
      <Button
        id="add-site-modal-button"
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input placeholder="My Site" {...field} />
                )}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Controller
                name="url"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input placeholder="https://website.com" {...field} />
                )}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              id="create-site-button"
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
