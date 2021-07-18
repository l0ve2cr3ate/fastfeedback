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

import { useForm, Controller } from "react-hook-form";

import { useAuth } from "@/lib/auth";

import { mutate } from "swr";

const EditeSiteModal = ({ children }) => {
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, control, register } = useForm();
  const toast = useToast();

  const onEditSite = (props) => {
    console.log({ props });

    // const newSite = {
    //   authorId: auth.user.uid,
    //   createdAt: new Date().toISOString(),
    //   name,
    //   url,
    // };

    // const { id } = createSite(newSite);

    // toast({
    //   title: "Success!",
    //   description: "We have added your site.",
    //   status: "success",
    //   duration: 5000,
    //   isClosable: true,
    // });
    // mutate(
    //   ["/api/sites", auth.user.token],
    //   async (data) => ({
    //     sites: [{ id, ...newSite }, ...data.sites],
    //   }),
    //   false
    // );
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
                {...register("timestamp")}
              />
              {/* <Controller
                name="timestamp"
                control={control}
                render={({ fields }) => (
                  <Switch
                    key="show-timestamp"
                    mt={1}
                    id="show-timestamp"
                    colorScheme="green"
                    defaultChecked={false}
                    {...fields}
                  />
                )}
              /> */}

              <FormLabel ml={2} htmlFor="show-timestamp">
                Show Timestamp
              </FormLabel>
            </FormControl>

            <FormControl display="flex">
              <Switch
                name="icon"
                mt={1}
                id="show-icon"
                colorScheme="green"
                {...register("icon")}
              />

              <FormLabel ml={2} htmlFor="show-icon">
                Show Icon
              </FormLabel>
            </FormControl>

            <FormControl display="flex">
              <Switch
                name="ratings"
                mt={1}
                id="show-ratings"
                colorScheme="green"
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
