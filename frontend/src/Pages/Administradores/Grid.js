import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  useToast,
  Container,
  Stack,
} from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";

const GridAdms = ({ adms, setAdms, setAoEditarAdm }) => {
  const toast = useToast();

  const handleEdit = (item) => {
    setAoEditarAdm(item);
  };

  const handleDelete = async (idAdm) => {
    try {
      await axios.delete(`http://localhost:8080/adms/${idAdm}`);
      const newArray = adms.filter((adm) => adm.idAdm !== idAdm);
      setAdms(newArray);
      toast({
        title: "Administrador excluído com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao deletar administrador!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="700px">
      <Stack overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Email</Th>
              <Th>Senha</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {adms.map((item, i) => (
              <Tr key={i}>
                <Td>{item.email_adm}</Td>
                <Td>{item.senha_adm}</Td>
                <Td>
                  <Icon as={FaEdit} onClick={() => handleEdit(item)} />
                </Td>
                <Td>
                  <Icon as={FaTrash} onClick={() => handleDelete(item.idAdm)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Container>
  );
};

// Definindo PropTypes para validar as props
GridAdms.propTypes = {
  adms: PropTypes.array.isRequired,
  setAdms: PropTypes.func.isRequired,
  setAoEditarAdm: PropTypes.func.isRequired,
};

export default GridAdms;
