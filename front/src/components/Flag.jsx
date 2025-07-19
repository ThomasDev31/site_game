import { useEffect, useState } from "react";
import Timer from "./litle_components/Timer";
import styled from "styled-components";

const value_Country = [
    { value: "Africa", name: "Afrique" },
    { value: "Americas", name: "Amerique" },
    { value: "Asia", name: "Asie" },
    { value: "Europe", name: "Europe" },
    { value: "Oceania", name: "Ocianie" },
    { value: "Antarctic", name: "Antarctique" },
    { value: "all", name: "Tous les continents" },
];
function Flag() {
    const [error, setError] = useState("");
    const [flags, setFlags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [inputs, setInputs] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState({});
    const [count, setCount] = useState(10);
    const [startTimer, setStartTimer] = useState(false);
    const [display, setDisplay] = useState(false)



    const fetchData = async () => {
        setIsLoading(true);
        setStartTimer(false);
        setCorrectAnswers([]);
        setInputs({});
        try {
            const reponse = await fetch("http://127.0.0.1:5000/jeu/flag");
            if (!reponse.ok) {
                throw new Error("Erreur lors du téléchargement des pays");
            }
            const data = await reponse.json();
            setFlags(data.flag);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handlesubmit = async (e) => {
        setStartTimer(true);
        setCount(10);
        setInputs({});
        setCorrectAnswers([]);
        setDisplay(false)
        const response = await fetch("http://127.0.0.1:5000/jeu/flag", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ e }),
        });
        const value = await response.json();
        console.log(value)
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
        const allCorrect = flags?.length > 0 && flags.every(f => correctAnswers[f.id]);
        if (allCorrect) {
            setStartTimer(!startTimer)
            alert("🎉 Bravo, vous avez tout trouvé !");
        }
    }, [correctAnswers, flags]);
    console.log(correctAnswers);
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <Heade>
                <nav>
                    <ul>
                        {value_Country.map((c) => (
                            <li
                                key={c.value}
                                onClick={() => handlesubmit(c.value)}
                            >
                                {c.name}
                            </li>
                        ))}
                    </ul>
                </nav>
                <Timer
                    count={count}
                    setStartTimer={setStartTimer}
                    startTimer={startTimer}
                    setCount={setCount}
                    setDisplay={setDisplay}
                />
                <p className={display? "lose active": "lose"}>Vous avez perdu</p>
            </Heade>
            {!isLoading && flags && (
                <ContainerFlag>
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
                                isCorrect={correctAnswers[f.id]}
                                isWrong={wrongAnswers[f.id]}
                            />
                            <button onClick={() => checkAnswer(f.id)}>
                                Vérifier
                            </button>
                            <p></p>
                        </div>
                    ))}
                </ContainerFlag>
            )}
        </>
    );
}

const ContainerFlag = styled.div`
    display: flex;
    flex-wrap: wrap;
    div {
       
    }
`;

const StyledInput = styled.input`
    background-color: ${({ isCorrect, isWrong }) =>
        isCorrect ? "lightgreen" : isWrong ? "#fc785b" : "#fff"};
    border: 2px solid
        ${({ isCorrect, isWrong }) =>
            isCorrect ? "lightgreen" : isWrong ? "#fc785b" : "#ccc"};
    border-radius: 5px;
    padding: 5px;
    margin: 5px 0;
    font-size: 1rem;
`;

const Heade = styled.header`

    .lose{
        display:none;
        &.active{
            display:flex;
        }
    }
`
export default Flag;
