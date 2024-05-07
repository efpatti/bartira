import { useEffect } from "react";
function Home() {
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
