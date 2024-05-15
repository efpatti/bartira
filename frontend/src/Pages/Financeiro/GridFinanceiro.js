import { useState } from "react";
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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";

const GridFinanceiro = ({ contas, setContas, setAoEditarConta }) => {
  const toast = useToast();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

  const handleEdit = (item) => {
    setAoEditarConta(item);
  };

  const handleDelete = async (idConta) => {
    try {
      await axios.delete(`http://localhost:8081/contas/${idConta}`);
      const newArray = contas.filter((user) => user.idConta !== idConta);
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

  const filteredContas = contas.filter((conta) => {
    if (categoriaSelecionada === "Todas") {
      return true;
    } else {
      return conta.categoria_conta === categoriaSelecionada;
    }
  });

  return (
    <Container maxW="700px">
      <Stack overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Preço</Th>
              <Th>
                <Menu>
                  <MenuButton>{categoriaSelecionada}</MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => setCategoriaSelecionada("Pagar")}>
                      Pagar
                    </MenuItem>
                    <MenuItem
                      onClick={() => setCategoriaSelecionada("Receber")}
                    >
                      Receber
                    </MenuItem>
                    <MenuItem onClick={() => setCategoriaSelecionada("Todas")}>
                      Todas
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Th>
              <Th>Status</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredContas.map((item, i) => (
              <Tr key={i}>
                <Td>{item.nome_conta}</Td>
                <Td>{item.preco_conta}</Td>
                <Td>{item.categoria_conta}</Td>
                <Td>{item.status_conta}</Td>
                <Td>
                  <Icon as={FaEdit} onClick={() => handleEdit(item)} />
                </Td>
                <Td>
                  <Icon
                    as={FaTrash}
                    onClick={() => handleDelete(item.idConta)}
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
GridFinanceiro.propTypes = {
  contas: PropTypes.array.isRequired,
  setContas: PropTypes.func.isRequired,
  setAoEditarConta: PropTypes.func.isRequired,
};

export default GridFinanceiro;
