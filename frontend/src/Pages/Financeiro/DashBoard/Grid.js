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

const GridContas = ({ contas, setContas, setAoEditar }) => {
  const toast = useToast();

  const handleEdit = (item) => {
    setAoEditar(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8080/" + id);
      const newArray = contas.filter((user) => user.id !== id);
      setContas(newArray);
      toast({
        title: "Conta excluída com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao deletar conta!",
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
              <Th>Descrição</Th>
              <Th>Categoria</Th>
              <Th>Preço</Th>
              <Th>Status</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {contas.map((item, i) => (
              <Tr key={i}>
                <Td>{item.nome}</Td>
                <Td>{item.descricao}</Td>
                <Td>{item.categoria}</Td>
                <Td>{item.preco}</Td>
                <Td>{item.status}</Td>
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
GridContas.propTypes = {
  contas: PropTypes.array.isRequired,
  setContas: PropTypes.func.isRequired,
  setAoEditar: PropTypes.func.isRequired,
};

export default GridContas;
