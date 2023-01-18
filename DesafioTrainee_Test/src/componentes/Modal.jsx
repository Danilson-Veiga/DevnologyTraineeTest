import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [name, setName] = useState(dataEdit.name || "");
  const [link, setLink] = useState(dataEdit.link || "");

  const handleSave = () => {
    if (!name || !link) return;

    if (linkAlreadyExists()) {
      return alert("Esse Link já existe!");
    }

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = { name, link };
    }

    const newDataArray = !Object.keys(dataEdit).length
      ? [...(data ? data : []), { name, link }]
      : [...(data ? data : [])];

    localStorage.setItem("cad_filme", JSON.stringify(newDataArray));

    setData(newDataArray);

    onClose();
  };

  const linkAlreadyExists = () => {
    if (dataEdit.link !== link && data?.length) {
      return data.find((item) => item.link === link);
    }

    return false;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicione um Filme</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Link</FormLabel>
                <Input
                  type="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;
