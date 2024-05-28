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

const Grid = ({ fornecedores, setFornecedores, setAoEditarFornecedor }) => {
  const toast = useToast();

  const handleEdit = (item) => {
    setAoEditarFornecedor(item);
  };

  const handleDelete = async (idFornecedor) => {
    try {
      await axios.delete(`http://localhost:8080/fornecedores/${idFornecedor}`);
      const newArray = fornecedores.filter(
        (user) => user.idFornecedor !== idFornecedor
      );
      setFornecedores(newArray);
      toast({
        title: "Fornecedor excluído com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao deletar fornecedor!",
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
              <Th>CNPJ</Th>
              <Th>Categoria</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {fornecedores.map((item, i) => (
              <Tr key={i}>
                <Td>{item.nome_fornecedor}</Td>
                <Td>{item.cnpj_fornecedor}</Td>
                <Td>{item.categoria_fornecedor}</Td>
                <Td>
                  <Icon as={FaEdit} onClick={() => handleEdit(item)} />
                </Td>
                <Td>
                  <Icon
                    as={FaTrash}
                    onClick={() => handleDelete(item.idFornecedor)}
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
  fornecedores: PropTypes.array.isRequired,
  setFornecedores: PropTypes.func.isRequired,
  setAoEditarFornecedor: PropTypes.func.isRequired,
};

export default Grid;
