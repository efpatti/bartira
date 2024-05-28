import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
function Home() {
  const [userType] = useAuth();
  if (userType)
    useEffect(() => {
      document.title = "Bartira | Home";
    }, []);
  return (
    <>
      <h1>Home</h1>
    </>
  );
}

export default Home;
