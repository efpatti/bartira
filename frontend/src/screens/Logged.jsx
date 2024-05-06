import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import {
  ButtonLink,
  Container,
  ContainerLogin,
  LoggedContainer,
} from "../styles";

export function Logged() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.warn("You have been logged out");
  };

  return (
    <Container>
      <ContainerLogin>
        <LoggedContainer>
          <h1>PARABÉNS !!!</h1>
          <h2>Bem vindo a rota privada!</h2>
          <h2>Você consegue ver isso porque está logado!</h2>
          <ButtonLink to="/" onClick={handleLogout}>
            Logout
          </ButtonLink>
        </LoggedContainer>
      </ContainerLogin>
    </Container>
  );
}
