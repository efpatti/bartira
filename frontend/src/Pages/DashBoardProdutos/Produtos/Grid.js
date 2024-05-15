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

const GridProdutos = ({ produtos, setProdutos, setAoEditarProduto }) => {
  const toast = useToast();

  const handleEdit = (item) => {
    setAoEditarProduto(item);
  };

  const handleDelete = async (idProduto) => {
    try {
      await axios.delete(`http://localhost:8081/produtos/${idProduto}`);
      const newArray = produtos.filter((user) => user.idProduto !== idProduto);
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

  return (
    <Container maxW="700px" bgColor={'#7c9eff'} mt={4} borderRadius={8}>
      <Stack overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Descrição</Th>
              <Th>Preço</Th>
              <Th>Quantidade</Th>
              <Th>Categoria</Th>
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
                <Td>{item.quantidade_produto}</Td>
                <Td>{item.categoria_produto}</Td>
                <Td>
                  <Icon as={FaEdit} onClick={() => handleEdit(item)} />
                </Td>
                <Td>
                  <Icon
                    as={FaTrash}
                    onClick={() => handleDelete(item.idProduto)}
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
GridProdutos.propTypes = {
  produtos: PropTypes.array.isRequired,
  setProdutos: PropTypes.func.isRequired,
  setAoEditarProduto: PropTypes.func.isRequired,
};

export default GridProdutos;
