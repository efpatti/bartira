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

const Grid = ({ usuarios, setUsuarios, setAoEditarUsuario }) => {
  const toast = useToast();

  const handleEdit = (item) => {
    setAoEditarUsuario(item);
  };

  const handleDelete = async (idUsuario) => {
    try {
      await axios.delete(`http://localhost:8081/usuarios/${idUsuario}`);
      const newArray = usuarios.filter(
        (usuario) => usuario.idUsuario !== idUsuario
      );
      setUsuarios(newArray);
      toast({
        title: "Usuário excluído com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao deletar usuário!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="full">
      <Stack overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Cargo</Th>
              <Th>CPF</Th>
              <Th>Endereço</Th>
              <Th>Tipo</Th>
              <Th>Senha</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {usuarios.map((item, i) => (
              <Tr key={i}>
                <Td>{item.nome}</Td>
                <Td>{item.email}</Td>
                <Td>{item.cargo}</Td>
                <Td>{item.cpf}</Td>
                <Td>{item.endereco}</Td>
                <Td>{item.tipo}</Td>
                <Td>{item.senha}</Td>
                <Td>
                  <Icon
                    as={FaEdit}
                    onClick={() => handleEdit(item)}
                    cursor="pointer"
                    color="blue.500"
                  />
                </Td>
                <Td>
                  <Icon
                    as={FaTrash}
                    onClick={() => handleDelete(item.idUsuario)}
                    cursor="pointer"
                    color="red.500"
                  />
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
Grid.propTypes = {
  usuarios: PropTypes.array.isRequired,
  setUsuarios: PropTypes.func.isRequired,
  setAoEditarUsuario: PropTypes.func.isRequired,
};

export default Grid;
