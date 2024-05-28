import React from "react";
import PropTypes from "prop-types";
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

const Grid = ({ vendas, setVendas, setAoEditarVenda }) => {
  const toast = useToast();

  const handleEdit = (item) => {
    setAoEditarVenda(item);
  };

  const handleDelete = async (idVenda) => {
    try {
      await axios.delete(`http://localhost:8080/vendas/${idVenda}`);
      const newArray = vendas.filter((venda) => venda.idVenda !== idVenda);
      setVendas(newArray);
      toast({
        title: "Venda excluída com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao deletar venda!",
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
              <Th>Nome do Cliente</Th>
              <Th>Produto</Th>
              <Th>Quantidade</Th>
              <Th>Status</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {vendas.map((item) => (
              <Tr key={item.idVenda}>
                <Td>{item.nome_cliente_venda}</Td>
                <Td>{item.nome_produto_venda}</Td>
                <Td>{item.quantidade_produto_venda}</Td>
                <Td>{item.status_venda}</Td>
                <Td>
                  <Icon as={FaEdit} onClick={() => handleEdit(item)} />
                </Td>
                <Td>
                  <Icon
                    as={FaTrash}
                    onClick={() => handleDelete(item.idVenda)}
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

Grid.propTypes = {
  vendas: PropTypes.array.isRequired,
  setVendas: PropTypes.func.isRequired,
  setAoEditarVenda: PropTypes.func.isRequired,
};

export default Grid;
