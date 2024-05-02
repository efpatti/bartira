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

const GridFuncionarios = ({ funcionarios, setFuncionarios, setAoEditar }) => {
  const toast = useToast();

  const handleEdit = (item) => {
    setAoEditar(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8080/funcionarios" + id);
      const newArray = funcionarios.filter((user) => user.id !== id);
      setFuncionarios(newArray);
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

  // Função para formatar a data de nascimento para o formato brasileiro
  const formatarDataBrasileira = (data) => {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, "0");
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <Container maxW="700px">
      <Stack overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Telefone</Th>
              <Th>Data de Nascimento</Th>
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
                <Td>{item.cpf_funcionario}</Td>
                <Td>{formatarDataBrasileira(item.cargo_funcionario)}</Td>
                <Td>{item.endereco_funcionario}</Td>
                <Td>{item.senha_funcionario}</Td>
                <Td>
                  <Icon as={FaEdit} onClick={() => handleEdit(item)} />
                </Td>
                <Td>
                  <Icon as={FaTrash} onClick={() => handleDelete(item.id)} />
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
  setAoEditar: PropTypes.func.isRequired,
};

export default GridFuncionarios;
