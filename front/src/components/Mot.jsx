import { useEffect, useState } from "react";
import Clavier from "./litle_components/Clavier";
import styled from "styled-components";
import Button from "./litle_components/Button";
import PenduCanva from "./litle_components/PenduCanva";
import Modal from "./litle_components/Modal";
import Loading from "./litle_components/Loading";
import { difficulties } from "../assets/datas";

function Mot() {
    const [data, setData] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [active, setActive] = useState([]);
    const [life, setLife] = useState(3);
    const [difficulty, setDifficulty] = useState();
    const [display, setDisplay] = useState(false);
    const [count, setCount] = useState(3);
    // fetchData et reinitialise data when we went to replay
    const fetchData = async () => {
        // reinitialise the globals state

        setIsActive(false);
        setText("");
        setActive([]);
        setLoading(true);
        try {
            const response = await fetch(
                "http://127.0.0.1:5000/jeu/mot/param",
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ difficulty, life }),
                }
            );
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

        const response = await fetch("http://127.0.0.1:5000/jeu/mot", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lettre }),
        });
        const value = await response.json();
        setData(value);
        if (value.win === true || value.win === false) {
            setIsActive(true);
        }

        setText("");
    };
    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            if (key === "backspace") {
                fetchData();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });
    const handleCountMore = () => {
        if (count < 10) {
            setCount(count + 1);
        }
        setLife(count);
    };
    const handleCountLess = () => {
        if (count > 3) {
            setCount(count - 1);
        }
        setLife(count);
    };

    return (
        <AllElement>
            {loading && display && <Loading />}
            {error && <p>{error}</p>}
            <Modal display={display}>
                <div className="modal-content">
                    <div className="content">
                        <h3 className="title-pendu">Difficulté</h3>
                        <div className="difficulties">
                            {difficulties.map((d, i) => (
                                <div key={i} onClick={() => setDifficulty(d)} className={difficulty === d ? "d active" : "d" }>{d}</div>
                            ))}
                        </div>
                    </div>
                    <div className="content">
                        <h3 className="title-pendu">Vie</h3>
                        <div className="life">
                            <div onClick={() => handleCountMore()}> + </div>
                            <div>{life}</div>
                            <div onClick={() => handleCountLess()}> - </div>
                        </div>
                    </div>
                </div>

                <Button
                    clickValue={() => {
                        fetchData();
                        setDisplay(true);
                    }}
                    value={"valider"}
                />
            </Modal>
            {!error && !loading && data && (
                <>
                    <ContainerGlobal className={display ? "" : "active"}>
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
                                {data.win === false && (
                                    <div>
                                        <p>Vous avez perdu</p>
                                    </div>
                                )}
                                {data.win === true && (
                                    <div>
                                        <p>Vous avez Gagné</p>
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
        </AllElement>
    );
}
const AllElement = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70vh;
    overflow: hidden;
    @media screen and (max-width: 780px) {
        height: 90vh;
        position: relative;
        top: -50px;
    }
`;

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
            font-size: 2.2rem;
        }
        p {
            font-size: 1.5rem;
        }
        .container-span {
            display: flex;
            flex-direction: row;
            font-size: 3rem;
            gap: 10px;
        }
    }
    @media screen and (max-width: 780px) {
        flex-direction: column;
        overflow-y: hidden;
        .content {
            padding-bottom: 15px;
            overflow-y: hidden;
            display: block;
            mar h3 {
                font-size: 1.8rem;
            }
            p {
                font-size: 1.2rem;
            }
            div {
            }
            .container-span {
                font-size: 2.2rem;
                justify-content: center;
            }
        }
    }
`;
const ContainerGlobal = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-width: 1240px;
    margin: auto;
    margin-top: 50px;
    background-color: #3f88c5;
    padding: 10px;
    border-radius: 15px;
    border: 2px solid #393e41;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.4);
    &.active {
        display: none;
    }
    h1 {
        font-size: 3rem;
        text-align: center;
        margin-bottom: 20px;
    }
    @media screen and (max-width: 780px) {
        h1 {
            font-size: 2.8rem;
            overflow-y: hidden;
        }
    }
`;
export default Mot;
