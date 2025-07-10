import styled from "styled-components";

function Clavier({ setText, text, handlesubmit, isActive, active, setActive }) {
    

    const claviers = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "é",
        "è",
        "â",
        "ï",
        "î",
    ];
    
    //verification if letter had not cliked
    const handleClick = (index) => {
        if (active.includes(index)) {
            return;
        }
        setActive((prev) => [...prev, index]);
    };

    return (
        <>
            <Clav
                style={{
                    pointerEvents: isActive ? "none" : "auto",
                }}
            >
                {claviers.map((c, index) => (
                    <p
                        className={active.includes(index) ? "active" : ""}
                        onClick={(e) => {
                            if (active.includes(index)) return;
                            const letter = e.target.textContent;
                            setText(text + letter);
                            handlesubmit(letter);
                            handleClick(index);
                        }}
                        key={index}
                        style={{
                            pointerEvents: isActive ? "none" : "auto",
                        }}
                    >
                        {c}
                    </p>
                ))}
            </Clav>
        </>
    );
}

const Clav = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 1240px;
    gap: 10px;
    align-items: center;
    justify-content: center;
    margin: auto;
    background-color: transparent !important;
    z-index: 2;
    margin-top:20px;

    p{
        width: 80px;
        height: 80px;
        border: 1px solid black;
        border-bottom:6px solid black;
        border-right:3px solid black;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
        box-shadow: -1px -1px 2px rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
        margin: 0;
        border-radius: 5px;
        transition:all .3s ease-in-out; 
        cursor: pointer;
        &:not(.active):hover{
            transform:scale(0.9);
            box-shadow:inset 1px 1px 3px rgba(0,0,0,0.5),inset -1px -1px 3px rgba(0,0,0,0.5);
            border: 1px solid black;
            border-bottom:2px solid black;
            
        }
    }
    p.active {
        border-color: black;
        background-color:rgba(0, 0, 0, 0.5);
        cursor: not-allowed;
        z-index: 1;
    }
`;
export default Clavier;
