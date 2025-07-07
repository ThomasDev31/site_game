import { useEffect, useState } from "react";
import Clavier from "./Clavier";
import styled from "styled-components";
function Mot() {
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [isActive, setIsActive] = useState(false)
  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/jeu/mot", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Erreur lors du chargmeent des données");
      }
      const value = await response.json();
      setData(value);
      console.log(value);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlesubmit = async (e) => {
    const lettre = text + e;
    console.log("Reception de la lettre", lettre);
    const response = await fetch("http://127.0.0.1:5000/jeu/mot", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lettre }),
    });
    const value = await response.json();
    setData(value);
    console.log(value);
    if(value.result === false){
      setIsActive(true)
    }
    setText("");
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {loading && <p>Chargement des données ... </p>}
      {error && <p>{error}</p>}
      {!error && !loading && data && (
        <>
          <Container>
            <h1>Jeu du pendu</h1>
            <h3>Mot en {data.longueur} lettres</h3>
            <p>Vous avez {data.life} de vies</p>
            <div className="container-span">
              {data?.mot_masque.map((t, index) => (
                <span key={index}>{t}</span>
              ))}
            </div>
            {data.result === true && (
              <div>
                <p>Vous avez perdu</p>
              </div>
            )}
          </Container>

          <Clavier setText={setText} text={text} handlesubmit={handlesubmit} isActive={isActive} />
        </>
      )}
    </>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 25px;
  justify-content:center;
  align-items:center;
  .container-span {
    display: flex;
    flex-direction: row;
    font-size: 2.5rem;
    gap:10px
  }
`;
export default Mot;
