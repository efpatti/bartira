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

const Grid = ({ produtos, setProdutos, setAoEditar }) => {
  const toast = useToast();

  const handleEdit = (item) => {
    setAoEditar(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8080" + id);
      const newArray = produtos.filter((user) => user.id !== id);
      setProdutos(newArray);
      toast({
        title: "Produto excluído com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao deletar produto!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // // Função para formatar a data de nascimento para o formato brasileiro
  // const formatarDataBrasileira = (data) => {
  //   const dataObj = new Date(data);
  //   const dia = dataObj.getDate().toString().padStart(2, "0");
  //   const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
  //   const ano = dataObj.getFullYear();
  //   return `${dia}/${mes}/${ano}`;
  // };

  return (
    <Container maxW="700px">
      <Stack overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Descrição</Th>
              <Th>Preço</Th>
              <Th>Categoria</Th>
              <Th>Quantidade</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {produtos.map((item, i) => (
              <Tr key={i}>
                <Td>{item.nome_produto}</Td>
                <Td>{item.descricao_produto}</Td>
                <Td>{item.preco_produto}</Td>
                <Td>{item.categoria_produto}</Td>
                <Td>{item.quantidade_produto}</Td>
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
Grid.propTypes = {
  produtos: PropTypes.array.isRequired,
  setProdutos: PropTypes.func.isRequired,
  setAoEditar: PropTypes.func.isRequired,
};

export default Grid;
