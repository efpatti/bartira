import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Box,
  InputRightElement,
  InputGroup,
  IconButton,
  Flex,
  Text,
  Stack,
  Link,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const Form = ({ pegarUsuarios, aoEditarUsuario, setAoEditarUsuario }) => {
  const ref = useRef();
  const [view, setView] = useState(false);
  const [cliente, setCliente] = useState(false);
  const [colaborador, setColaborador] = useState(false);
  const [resetAppear, setResetAppear] = useState(false);
  const [checkedCep, setCheckedCep] = useState(false);
  const [endereco, setEndereco] = useState({
    rua: "",
    cidade: "",
    estado: "",
    pais: "",
  });

  // Adicione o estado para armazenar o status da validação do CPF
  const [cpfValido, setCpfValido] = useState(false);

  // Adicione uma função para validar o CPF quando o campo de CPF perder o foco

  const handleCpfCheck = () => {
    const cpf = ref.current.cpf.value;
    setCpfValido(validarCPF(cpf));
  };

  useEffect(() => {
    if (userType === "Funcionário") {
      handleCliente();
    }
    if (aoEditarUsuario) {
      const usuario = ref.current;
      usuario.nome.value = aoEditarUsuario.nome;
      usuario.email.value = aoEditarUsuario.email;
      usuario.cargo.value = aoEditarUsuario.cargo;
      usuario.cpf.value = aoEditarUsuario.cpf;
      usuario.cep.value = aoEditarUsuario.cep;
      usuario.rua.value = aoEditarUsuario.rua;
      usuario.numero.value = aoEditarUsuario.numero;
      usuario.cidade.value = aoEditarUsuario.cidade;
      usuario.estado.value = aoEditarUsuario.estado;
      usuario.pais.value = aoEditarUsuario.pais;
      usuario.tipo.value = aoEditarUsuario.tipo;
      usuario.senha.value = aoEditarUsuario.senha;
    }
  }, [aoEditarUsuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulário enviado!");

    const usuario = ref.current;

    // Verifique se todos os campos estão preenchidos
    const campos = [
      "nome",
      "email",
      "cpf",
      "cep",
      "rua",
      "numero",
      "cidade",
      "estado",
      "pais",
      "tipo",
      "senha",
    ];
    if (campos.some((campo) => !usuario[campo].value)) {
      return toast.warn("Preencha todos os campos!");
    }

    const dadosUsuario = {
      nome: usuario.nome.value,
      email: usuario.email.value,
      cargo: usuario.cargo.value,
      cpf: usuario.cpf.value,
      cep: usuario.cep.value,
      rua: usuario.rua.value,
      numero: usuario.numero.value,
      cidade: usuario.cidade.value,
      estado: usuario.estado.value,
      pais: usuario.pais.value,
      tipo: usuario.tipo.value,
      senha: usuario.senha.value,
    };

    // Se o cliente for verdadeiro, não inclua o campo "cargo"
    if (!cliente) {
      dadosUsuario.cargo = usuario.cargo.value;
    }

    try {
      const response = await axios.post(
        aoEditarUsuario
          ? `http://localhost:8080/usuarios/${aoEditarUsuario.idUsuario}`
          : "http://localhost:8080/usuarios",
        dadosUsuario
      );
      console.log("Resposta:", response.data);
      toast.success(response.data);
      // Limpe os campos e atualize a lista de usuários
      campos.forEach((campo) => (usuario[campo].value = ""));
      setAoEditarUsuario(null);
      pegarUsuarios();
    } catch (error) {
      console.error("Erro:", error.response.data);
      toast.error(error.response.data.message);
    }
  };

  const handleCheckCep = async () => {
    const cep = ref.current.cep.value;

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, localidade, uf, pais } = response.data;
      setEndereco({
        rua: logradouro,
        cidade: localidade,
        estado: uf,
        pais: pais || "Brasil",
      });
      setCheckedCep(true);
    } catch (error) {
      toast.error("CEP não encontrado");
      console.error(error);
    }
  };

  const clearInputs = () => {
    document.getElementById("form").reset();
    setResetAppear(false);
    setCpfValido(false);
    setCheckedCep(false);
    setView(false);
    if (userType === "Funcionário") {
      handleCliente();
    }
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos
    setResetAppear(true);
    const cpfErro = () => {
      toast.warn("CPF inválido");
    };

    // Verifica se o CPF está vazio
    if (cpf === "") {
      cpfErro();
      return false;
    }

    // Verifica se o CPF possui 11 dígitos e não é uma sequência repetida
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      cpfErro();
      return false;
    }

    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) {
      cpfErro();
      return false;
    }

    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) {
      cpfErro();
      return false;
    }

    // CPF válido
    return true;
  };

  const handleColaborador = () => {
    if (!colaborador) {
      setColaborador(true);
      setCliente(false);
      setView(true);
    }
  };

  const handleCliente = () => {
    setCliente(true);
    setColaborador(false);
    setView(true);
  };

  const { userType } = useAuth();

  return (
    <Box>
      <Flex
        position="fixed"
        top="20%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex="2"
        align="center"
        justify="center"
        p="5"
      >
        <Stack direction="row" gap="5" borderRadius="lg" mb="5">
          <Text fontSize="xl">Usuários</Text>
          {resetAppear && (
            <Link as={Text} onClick={clearInputs} variant="none" fontSize="xl">
              Reset
            </Link>
          )}
        </Stack>
      </Flex>
      {view ? (
        <Stack direction="column" gap="3">
          <Button onClick={handleColaborador}>Colaborador</Button>
          <Button onClick={handleCliente}>Cliente</Button>
        </Stack>
      ) : (
        <form ref={ref} onSubmit={handleSubmit} id="form">
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input name="nome" defaultValue="" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" defaultValue="" />
          </FormControl>
          <FormControl>
            <FormLabel>Cargo</FormLabel>
            <Input name="cargo" type="text" defaultValue="" />
          </FormControl>
          <FormControl>
            <FormLabel>CPF</FormLabel>
            <InputGroup>
              <Input
                name="cpf"
                defaultValue=""
                readOnly={cpfValido ? "readonly" : ""}
                cursor={cpfValido ? "not-allowed" : ""}
              />
              <InputRightElement>
                <IconButton
                  as={Button}
                  aria-label="Checar Cpf"
                  icon={<FaCheck />}
                  bg="transparent"
                  variant="none"
                  onClick={handleCpfCheck}
                  _hover={{ opacity: "70%", bg: "transparent" }}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          {cpfValido && (
            <>
              <FormControl>
                <FormLabel>CEP</FormLabel>
                <InputGroup>
                  <Input
                    name="cep"
                    type="text"
                    readOnly={checkedCep ? "readonly" : ""}
                    cursor={checkedCep ? "not-allowed" : ""}
                  />
                  <InputRightElement>
                    <IconButton
                      as={Button}
                      aria-label="Checar CEP"
                      icon={<FaCheck />}
                      onClick={handleCheckCep}
                      bg="transparent"
                      variant="none"
                      _hover={{ opacity: "70%", bg: "transparent" }}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {checkedCep && (
                <>
                  <FormControl>
                    <FormLabel>Rua</FormLabel>
                    <Input
                      name="rua"
                      type="text"
                      defaultValue={endereco.rua}
                      readOnly="readonly"
                      cursor="not-allowed"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Número</FormLabel>
                    <Input name="numero" type="text" defaultValue="" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cidade</FormLabel>
                    <Input
                      name="cidade"
                      type="text"
                      defaultValue={endereco.cidade}
                      readOnly="readonly"
                      cursor="not-allowed"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Estado</FormLabel>
                    <Input
                      name="estado"
                      type="text"
                      defaultValue={endereco.estado}
                      readOnly="readonly"
                      cursor="not-allowed"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>País</FormLabel>
                    <Input
                      name="pais"
                      type="text"
                      defaultValue={endereco.pais}
                      readOnly="readonly"
                      cursor="not-allowed"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Tipo</FormLabel>
                    {colaborador ? (
                      <Select name="tipo" defaultValue="Funcionário">
                        <option value="Funcionário">Funcionário</option>
                        <option value="Administrador">Administrador</option>
                      </Select>
                    ) : (
                      <Select name="tipo" defaultValue="Cliente">
                        <option value="Cliente">Cliente</option>
                        <option value="Funcionário">Funcionário</option>
                      </Select>
                    )}
                  </FormControl>
                  <FormControl mb="5">
                    <FormLabel>Senha</FormLabel>
                    <Input name="senha" type="password" defaultValue="" />
                  </FormControl>
                  <Button type="submit" variant="ghost">
                    Salvar
                  </Button>
                </>
              )}
            </>
          )}
        </form>
      )}
    </Box>
  );
};

// Definindo PropTypes para validar as props
Form.propTypes = {
  pegarUsuarios: PropTypes.func.isRequired,
  aoEditarUsuario: PropTypes.object,
  setAoEditarUsuario: PropTypes.func.isRequired,
};

export default Form;
