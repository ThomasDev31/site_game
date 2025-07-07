import { useEffect, useState } from "react";
import Clavier from "./litle_components/Clavier";
import styled from "styled-components";
import Button from "./litle_components/Button";
import PenduCanva from "./litle_components/PenduCanva";
function Mot() {
    const [data, setData] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [active, setActive] = useState([]);

    // fetchData et reinitialise data when we went to replay
    const fetchData = async () => {
        // reinitialise the globals state
        setIsActive(false);
        setText("");
        setActive([]);
        setLoading(true);

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

    // POST data for back
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
        if (value.win === true) {
            setIsActive(true);
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
                    <ContainerGlobal>
                                <h1>Jeu du pendu</h1>
                        <Container>
                            <div className="content">
                                <h3>Mot en {data.longueur} lettres</h3>
                                <p>Vous avez {data.life} de vies</p>
                                <div className="container-span">
                                    {data?.mot_masque.map((t, index) => (
                                        <span key={index}>{t}</span>
                                    ))}
                                </div>
                                {data.win === true && (
                                    <div>
                                        <p>Vous avez perdu</p>
                                    </div>
                                )}
                            </div>

                            <PenduCanva life={data.life} />
                        </Container>
                        <Clavier
                            setText={setText}
                            text={text}
                            handlesubmit={handlesubmit}
                            isActive={isActive}
                            active={active}
                            setActive={setActive}
                        />
                        <Button clickValue={fetchData} value={"Rejouer"} />
                    </ContainerGlobal>
                </>
            )}
        </>
    );
}

const Container = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    width: 100%;
    .content {
        display: flex;
        flex-direction: column;
        gap: 5px;
        justify-content: center;
        align-items: center;
        min-width: 40%;
       
        h3 {
          font-size:2.2rem;
        }
        p {
          font-size:1.5rem;
        }
        .container-span {
            display: flex;
            flex-direction: row;
            font-size: 3rem;
            gap: 10px;
        }
    }
`;
const ContainerGlobal = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-width: 1240px;
    margin: auto;
     h1 {
          font-size:3rem;
          text-align:center;
          margin-bottom:20px;
        }
`;
export default Mot;
