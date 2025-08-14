import styled from "styled-components";
function Button({value, clickValue=null}) {
    return (
        <>
            <SyledButton onClick={clickValue}>{value}</SyledButton>
        </>
    );
}

const SyledButton = styled.button`
    width: 150px;
    margin: auto;

    padding: 10px 10px;
    font-size: 1.5rem;
    font-weight: 500;
    color: black;
    outline: none;
    border: 1px solid #393E41;
    border-bottom: 4px solid #393E41;
    border-right: 2px solid #393E41;
    border-radius: 10px;
    background-color: inherit;
    overflow:hidden;
    cursor: pointer;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4),
            -1px -1px 10px rgba(0, 0, 0, 0.4);
    }
`;
export default Button;