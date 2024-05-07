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

const GridFuncionarios = ({
  funcionarios,
  setFuncionarios,
  setAoEditarFuncionario,
}) => {
  const toast = useToast();

  const handleEdit = (item) => {
    setAoEditarFuncionario(item);
  };

  const handleDelete = async (idFuncionario) => {
    try {
      await axios.delete(`http://localhost:8080/funcionarios/${idFuncionario}`);
      const newArray = funcionarios.filter(
        (funcionario) => funcionario.idFuncionario !== idFuncionario
      );
      setFuncionarios(newArray);
      toast({
        title: "Funcionário excluído com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao deletar funcionário!",
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
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Cargo</Th>
              <Th>CPF</Th>
              <Th>Endereço</Th>
              <Th>Senha</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {funcionarios.map((item, i) => (
              <Tr key={i}>
                <Td>{item.nome_funcionario}</Td>
                <Td>{item.email_funcionario}</Td>
                <Td>{item.cargo_funcionario}</Td>
                <Td>{item.cpf_funcionario}</Td>
                <Td>{item.endereco_funcionario}</Td>
                <Td>{item.senha_funcionario}</Td>
                <Td>
                  <Icon as={FaEdit} onClick={() => handleEdit(item)} />
                </Td>
                <Td>
                  <Icon
                    as={FaTrash}
                    onClick={() => handleDelete(item.idFuncionario)}
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
GridFuncionarios.propTypes = {
  funcionarios: PropTypes.array.isRequired,
  setFuncionarios: PropTypes.func.isRequired,
  setAoEditarFuncionario: PropTypes.func.isRequired,
};

export default GridFuncionarios;
