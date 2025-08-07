import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Timer from "./litle_components/Timer";
import styled from "styled-components";
import Modal from "./litle_components/Modal";
import Button from "./litle_components/Button";
import { value_Country } from "../assets/datas";

function Flag() {
    const [error, setError] = useState("");
    const [flags, setFlags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [inputs, setInputs] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState({});
    const [count, setCount] = useState(600);
    const [startTimer, setStartTimer] = useState(false);
    const [display, setDisplay] = useState(false);
    const [displayResult, setDisplayResult] = useState(false);
    const [displayTimer, setdisplayTimer] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [chrono, setChrono] = useState(false);
    const [region, setRegion] = useState();
    const [hasSelected, setHasSelected] = useState(false);
    const naviguate = useNavigate();

    const fetchData = async () => {
        setIsLoading(true);
        setStartTimer(false);
        setCorrectAnswers([]);
        setInputs({});
        setDisplayResult(false)

        try {
            const reponse = await fetch("http://127.0.0.1:5000/jeu/flag");
            if (!reponse.ok) {
                throw new Error("Erreur lors du téléchargement des pays");
            }
            const data = await reponse.json();
            setFlags(data.flag);
            console.log(data);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };
    const HandleRegionClick = (value) => {
        setRegion(value);
        setHasSelected(value);
    };
    const handlesubmit = async () => {
        setStartTimer(true);
        setShowResults(false);
        setInputs({});
        setCorrectAnswers([]);
        setDisplay(false);

        if (region === "all") {
            setCount(600);
        } else {
            setCount(30);
        }
        if (chrono) {
            setCount(0);
        }
        const response = await fetch("http://127.0.0.1:5000/jeu/flag", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ region }),
        });
        const value = await response.json();
        setFlags(value.flag);
    };

    const handleInputChange = (id, value) => {
        setInputs((prev) => ({ ...prev, [id]: value }));
    };

    const checkAnswer = async (id) => {
        const guess = inputs[id] || "";
        const response = await fetch("http://127.0.0.1:5000/jeu/flag/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ flag: id, guess }),
        });
        const data = await response.json();

        if (data.success && data.correct) {
            setCorrectAnswers((prev) => ({ ...prev, [id]: true }));
            setWrongAnswers((prev) => ({ ...prev, [id]: false }));
        } else {
            setCorrectAnswers((prev) => ({ ...prev, [id]: false }));
            setWrongAnswers((prev) => ({ ...prev, [id]: true }));
        }
    };

    useEffect(() => {
        const timers = {};
        Object.entries(inputs).forEach(([flagId, value]) => {
            if (value && value.length > 1 && !correctAnswers[flagId]) {
                if (timers[flagId]) clearTimeout(timers[flagId]);
                timers[flagId] = setTimeout(() => {
                    checkAnswer(flagId);
                }, 700);
            }
        });
        return () => {
            Object.values(timers).forEach(clearTimeout);
        };
    }, [inputs]);

    useEffect(() => {
        const allCorrect =
            flags?.length > 0 && flags.every((f) => correctAnswers[f.id]);
        if (allCorrect) {
            setStartTimer(!startTimer);
            alert("🎉 Bravo, vous avez tout trouvé !");
        }
    }, [correctAnswers, flags]);

    useEffect(() => {
        fetchData();
    }, [region]);

    return (
        <GameFlag>
            <Modal display={display} className="param-flag" >
                <h3 className="title-flag">Choisir la region</h3>

                {value_Country.map((c, i) => (
                    <div onClick={() => HandleRegionClick(c.value)} key={i} className={`continents-values ${region === c.value ? 'active' : ''}`}>
                        {c.name}
                      
                    </div>
                ))}
                    <h3 className="title-flag">Choisir votre type de temps</h3>
                <div className="container-btns">
                    <div className={`btn-time ${chrono === true ? 'active' : ''}`} onClick={() => setChrono(true)}>
                        Chronomètre
                     
                    </div>
                    <div className={`btn-time ${chrono === false ? 'active' : ''}`}  onClick={() => setChrono(false)}>
                        Timer
                        
                    </div>
                </div>
                <Button
                    clickValue={() => {
                        handlesubmit();
                        setDisplay(true);
                    }}
                    value={"Valider"}
                ></Button>
            </Modal>
            <Heade className={display ? "active" : ""}>
                <button
                    className={flags?.length > 0 ? "active" : ""}
                    onClick={handlesubmit}
                >
                    Rejouer
                </button>
                <Timer
                    count={count}
                    setStartTimer={setStartTimer}
                    startTimer={startTimer}
                    setCount={setCount}
                    setDisplayResult={setDisplayResult}
                    displayTimer={displayTimer}
                    setdisplayTimer={setdisplayTimer}
                    chrono={chrono}
                    setShowResults={setShowResults}
                />
                <p className={displayResult ? "lose active" : "lose"}>
                    Vous avez perdu
                </p>
                <p className={displayResult ? "resultat active" : "resultat"}>Votre résultat est {`${flags?.length} / ${Object.keys(correctAnswers).length}`} </p>
            </Heade>
            {!isLoading && flags && (
                <ContainerFlag
                    className={`${!showResults ? "active" : ""} ${
                        !display ? "show" : ""
                    }`}
                >
                    {flags?.map((f, i) => (
                        <div key={i}>
                            <img
                                src={`https://flagcdn.com/256x192/${f.id}.png`}
                            />

                            <StyledInput
                                type="text"
                                placeholder="Nom du pays"
                                value={inputs[f.id] || ""}
                                onChange={(e) =>
                                    handleInputChange(f.id, e.target.value)
                                }
                                disabled={correctAnswers[f.id]}
                                iscorrect={correctAnswers[f.id]}
                                iswrong={wrongAnswers[f.id]}
                            />
                        </div>
                    ))}
                </ContainerFlag>
            )}
            {showResults && (
                <>
                    <table className={showResults ? "active" : ""}>
                        <thead>
                            <tr>
                                <th>Drapeau</th>
                                <th>Bonne réponse</th>
                                <th>Ta réponse</th>
                                <th>Résultat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flags.map((f) => (
                                <tr key={f.id}>
                                    <td>
                                        <img
                                            src={`https://flagcdn.com/80x60/${f.id}.png`}
                                            alt={`Drapeau de ${f.correctAnswer}`}
                                            width="50"
                                        />
                                    </td>
                                    <td>{f.name}</td>
                                    <td>{inputs[f.id]}</td>
                                    <td>
                                        {correctAnswers[f.id] ? (
                                            <span style={{ color: "green" }}>
                                                ✅ Bonne
                                            </span>
                                        ) : (
                                            <span style={{ color: "red" }}>
                                                ❌ Mauvaise
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </GameFlag>
    );
}

const GameFlag = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    max-width: 1240px;
    margin: auto;
    table {
        display: none;
    }
    table.active {
        display: block;
        height:60vh;
    }
    .param-flag {
        height: 80vh;
    }
    @media screen and (max-width: 720px) {
        justify-content: flex-start;
        height: 80%;
    }
`;

const ContainerFlag = styled.div`
    display: none;
    div {
        display: flex;
        flex-direction: column;
        gap: 25px;
        img {
            width: 250px;
        }
    }
    &.active {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 25px;
    }
    &.show {
        display: none;
    }
    @media screen and (max-width: 1240px) {
        width: 80%;
        gap: 15px;
        height: 75%;
    }
`;

const StyledInput = styled.input`
    background-color: ${({ iscorrect, iswrong }) =>
        iscorrect ? "lightgreen" : iswrong ? "#fc785b" : "#fff"};
    border: 2px solid
        ${({ iscorrect, iswrong }) =>
            iscorrect ? "lightgreen" : iswrong ? "#fc785b" : "#ccc"};
    border-radius: 5px;
    padding: 5px;
    margin: 5px 0;
    font-size: 1rem;
`;

const Heade = styled.header`
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    width: 100%;
    button {
        display: none;
        margin-top: 10px;
        width: auto;
        padding: 10px;
        font-size: 1.5rem;
        font-weight: bold;
        &.active {
            display: block;
        }
    }
    nav {
        ul {
            list-style: none;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            background-color: blue;
            padding: 20px;
            li {
                font-size: 1.5rem;
                cursor: pointer;
            }
        }
    }
    .lose {
        display: none;
        overflow:hidden;
        margin-top:10px;
        &.active {
            display: block;
            text-align: center;
            font-size: 2.5rem;
            font-weight: bold;
        }
    }
     .resultat {
        display: none;
        overflow:hidden;
        margin-top:10px;
        &.active {
            display: block;
            text-align: center;
            font-size: 2rem;
            font-weight: bold;
        }
    }
    &.active {
        display: flex;
    }
    @media screen and (max-width: 720px) {
        margin-top: 0;
    }
`;
export default Flag;
