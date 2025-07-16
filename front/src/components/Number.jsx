import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./litle_components/Button";
function Number() {
    const [data, setData] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState("");
    const [message, setMessage] = useState("");
    const [count, setCount] = useState(30);
    const [startTimer, setStartTimer] = useState(false);

    const fetchData = async () => {
        setCount(30);
        setStartTimer(false);
        setNumber("");
        setMessage("");

        try {
            const response = await fetch("http://127.0.0.1:5000/jeu/number", {
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des données");
            }
            const value = await response.json();
            setData(value);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleTimeOut = async () => {
        const number = 0;
        const response = await fetch("http://127.0.0.1:5000/jeu/number", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ timeOut: true, number }),
        });
        const value = await response.json();
        setData(value);
        setMessage(value.message || "");
        setNumber('');
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        setStartTimer(true);
        const response = await fetch("http://127.0.0.1:5000/jeu/number", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ number }),
        });
        const value = await response.json();
        setData(value);
        if (value.value) {
            setNumber(0);
            setStartTimer(false);
        }
        setMessage(value.message || "");
        setNumber(' ')
    };

    useEffect(() => {
        if (!startTimer) return;
        if (count < 0) {
            setStartTimer(false);
            return;
        }
        const intervalId = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [startTimer, count]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (count === 0) {
            handleTimeOut();
        }
    }, [count]);

    return (
        <>
            {loading && <p>Chargement des données ... </p>}
            {error && <p>{error}</p>}
            {!error && !loading && data && (
                <>
                    <ContainerGlobal>
                        <PriceDiv>
                            <h1>Devinez le prix</h1>

                            <div className="content-form">
                                <h3>
                                    Essayer de trouver le prix vous avez {""}{" "}
                                    <strong>{count > 0 ? count : 0}</strong>s
                                </h3>
                                {data?.value && (
                                    <p>Le prix est {data?.number} €</p>
                                )}
                                <form onSubmit={handlesubmit}>
                                    <input
                                        type="number"
                                        value={number || 0}
                                        onChange={(e) =>
                                            setNumber(e.target.value)
                                        }
                                        min={5000}
                                        max={30000}
                                        id="number"
                                    />
                                    <input
                                        type="submit"
                                        value="envoyer"
                                        id="submit"
                                    />
                                </form>
                            </div>

                            <p>{message}</p>
                        </PriceDiv>
                        <Button clickValue={fetchData} value={"Rejouer"} />
                    </ContainerGlobal>
                </>
            )}
        </>
    );
}
const PriceDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60vh;
    gap: 50px;
    .content-form {
        display: flex;
        flex-direction: column;
        gap: 30px;
        h3 {
            font-weight: 500;
        }
        form {
            display: flex;
            flex-direction: column;
            gap: 20px;
            #number {
                outline: none;
                border: none;
                border: 1px solid black;
                font-size: 1.5rem;
                padding: 10px 5px;
                border-radius: 15px;
            }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            #submit {
                width: 60%;
                margin: auto;
                margin-top:15px;
                outline: none;
                background-color: inherit;
                border:2px solid black;
                padding:10px 20px;
                border-radius:15px;
                font-size:1.8rem;
                transition: all .4s ease-in-out;
                cursor: pointer;
                &:hover{
                    background-color:black;
                    color:white;
                    
                }
            }
        }
    }
`;

const ContainerGlobal = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1240px;
    margin: auto;
    align-items: center;
    h1 {
        font-size: 3rem;
        text-align: center;
        margin-bottom: 20px;
    }
`;
export default Number;
