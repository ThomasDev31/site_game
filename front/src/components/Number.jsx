import { useState, useEffect } from "react";
import styled from "styled-components";

function Number() {
    const [data, setData] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState("");
    const [message, setMessage] = useState("");
    const [count, setCount] = useState(10);
    const [startTimer, setStartTimer] = useState(false);


    const fetchData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/jeu/number", {
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des données");
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

    const handleTimeOut = async () => {
        const response = await fetch("http://127.0.0.1:5000/jeu/number", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "timeOut": true, number }),
        });
        const value = await response.json();
        setData(value);
        setMessage(value.message || "");
        setNumber('')
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
            setStartTimer(false);
        }
        console.log(value);
        setMessage(value.message || "");
        setNumber('')
    };

    useEffect(() => {
        if (!startTimer) return;
        if (count <= 0) {
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
                    <PriceDiv>
                        <h1>Devinez le prix</h1>

                        <div className="content-form">
                            <h3>
                                Essayer de trouver le prix vous avez {""}{" "}
                                <strong>{count > 0 ? count : 0}</strong>s
                            </h3>
                            {count <= 0 && data?.value && (
                                    <p>Le prix est {data?.number}</p>
                                )}
                            <form onSubmit={handlesubmit}>
                                <input
                                    type="number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    min={0}
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
    height: 80vh;
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
                width: 40%;
                margin: auto;
                outline: none;
                border: none;
                background-color: inherit;
            }
        }
    }
`;
export default Number;
