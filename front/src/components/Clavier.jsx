import { useState } from "react";
import styled from "styled-components";

function Clavier({ setText, text, handlesubmit, isActive}) {
    const[active, setActive] = useState([]);

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
  console.log(text);
  console.log(active);

  const handleClick = (index) => {
    if(!active.includes(index)){
        setActive( (prev) => [...prev, index])
    }
  }

  return (
    <>
      <Clav className={isActive ? "is-active" : ""}>
        {claviers.map((c, index) => (
          <p
            className={active.includes(index) ? "active" :""}
            onClick={(e) => {
              setText(text + e.target.textContent); 
              handlesubmit(e.target.textContent);
              handleClick(index)
            }}
            key={index}
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
  max-width: 800px;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin :auto;
  p {
    width: 50px;
    height: 50px;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }
  p.active{
    border-color: black;
    cursor:not-allowed;
  }
  &.is-active{
    display:none;
  }
`;
export default Clavier;
