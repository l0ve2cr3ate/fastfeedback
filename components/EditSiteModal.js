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
  useToast,
  useDisclosure,
  Switch,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { mutate } from "swr";
import { useForm } from "react-hook-form";

import { useAuth } from "@/lib/auth";
import { updateSite } from "@/lib/db";

const EditeSiteModal = ({ children, siteId, settings }) => {
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();
  const toast = useToast();

  const onEditSite = async (newSettings) => {
    await updateSite(siteId, { settings: newSettings });

    toast({
      title: "Success!",
      description: "We have updated your site.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    mutate(`/api/site/${siteId}`);
    onClose();
  };

  return (
    <>
      <Button
        id="add-site-modal-button"
        onClick={onOpen}
        backgroundColor="gray.900"
        leftIcon={<SettingsIcon />}
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
        <ModalContent as="form" onSubmit={handleSubmit(onEditSite)}>
          <ModalHeader fontWeight="bold">Edit Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl display="flex">
              <Switch
                name="timestamp"
                mt={1}
                id="show-timestamp"
                colorScheme="green"
                defaultIsChecked={settings?.timestamp}
                {...register("timestamp")}
              />

              <FormLabel ml={2} htmlFor="show-timestamp">
                Show Timestamp
              </FormLabel>
            </FormControl>

            <FormControl display="flex">
              <Switch
                name="icons"
                mt={1}
                id="show-icons"
                colorScheme="green"
                defaultIsChecked={settings?.icons}
                {...register("icons")}
              />

              <FormLabel ml={2} htmlFor="show-icons">
                Show Icon
              </FormLabel>
            </FormControl>

            <FormControl display="flex">
              <Switch
                name="ratings"
                mt={1}
                id="show-ratings"
                colorScheme="green"
                defaultIsChecked={settings?.ratings}
                {...register("ratings")}
              />

              <FormLabel ml={2} htmlFor="show-ratings">
                Show Ratings
              </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              id="update-site-button"
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditeSiteModal;
