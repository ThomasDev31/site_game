import styled, { keyframes } from "styled-components";
function Modal({ children, display }) {
    return (
        <ContainerModal className={display ? "active" : ""}>
            <h1>Choisir Les paramètres de jeu</h1>
            {children}
        </ContainerModal>
    );
}

const fadeIn = keyframes`
    from{
        &::after{
            width:0%;
        }
    }to{
       &::after{
            width:100%;
        }
    }
`;

const ContainerModal = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1240px;
    width: 40%;
    margin: auto;
    text-align: center;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
    gap: 20px;
    padding: 15px;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.4);
    height: auto;
    h1 {
        overflow: hidden;
        padding-bottom: 10px;
    }
    &.active {
        display: none;
    }
    .modal-content {
        display: flex;
        gap: 20px;
        margin-top: 15px;
        flex-direction: column;
        width: 100%;
        .content {
            display: flex;
            gap: 10px;
            flex-direction: column;
            width: 100%;
            h3{
                font-size:2.2rem;
            }
            .life {
                display: flex;
                justify-content: center;
                gap: 20px;
                align-items: center;
                div {
                    font-size: 2rem;
                }
                div:nth-of-type(odd) {
                    border: 2px solid white;
                    padding: 5px 10px;
                    cursor: pointer;
                    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
                    &:hover {
                        transform: scale(0.9);
                    }
                }
                div:nth-of-type(even) {
                    padding: 10px 20px;
                }
            }
            .difficulties {
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 10px;
                overflow: hidden;

                .d {
                    border: 1px solid #3f88c5;
                    padding: 5px 10px;
                    width: 40%;
                    border-radius: 15px;
                    font-size: 1.5rem;
                    transition: background-color 0.4s ease-in-out;
                    position: relative;
                    z-index: 1;

                    &::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: #3f88c5;
                        transform: scaleX(0);
                        transform-origin: center;
                        transition: transform 0.5s ease-in-out;
                        z-index: -1;
                    }

                    &.active {
                        font-weight: bold;
                        background-color: #3f88c5;
                    }
                    &:hover::after,
                    &.active::after {
                        transform: scaleX(1);
                    }
                    &.active {
                        color: white;
                        border: 2px solid white;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 980px) {
        width: 80%;
    }
    @media screen and (max-width: 540px) {
        .modal-content {
            display: flex;
            gap: 20px;
            margin-top: 15px;
            flex-direction: column;

            .content {
                display: flex;
                gap: 10px;

                label {
                    font-size: 1.8rem;
                    font-weight: bold;
                }
            }
        }
    }
    .title-flag {
        overflow: hidden;
        padding-bottom: 10px;
    }
    .continents-values {
        display: flex;
        align-items: center;
        border: 1px solid #3f88c5;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 1.5rem;
        overflow: hidden;
        transition: background-color 0.4s ease-in-out;
        position: relative;
        z-index: 1;
        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #3f88c5;
            transform: scaleX(0);
            transform-origin: center;
            transition: transform 0.5s ease-in-out;
            z-index: -1;
        }

        &.active {
            font-weight: bold;
            background-color: #3f88c5;
        }
        &:hover::after,
        &.active::after {
            transform: scaleX(1);
        }
        &.active {
            color: white;
            border: 2px solid white;
        }
    }
    .container-btns {
        overflow: hidden;
        display: flex;
        gap: 15px;
        .btn-time {
            display: flex;
            align-items: center;
            border: 1px solid #3f88c5;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 1.5rem;
            overflow: hidden;
            transition: background-color 0.4s ease-in-out;
            position: relative;
            z-index: 1;
            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #3f88c5;
                transform: scaleX(0);
                transform-origin: center;
                transition: transform 0.5s ease-in-out;
                z-index: -1;
            }
            .validate-text {
                animation: ${fadeIn} 0.5s ease-in-out;
            }
            &.active {
                font-weight: bold;
                background-color: #3f88c5;
            }
            &:hover::after,
            &.active::after {
                transform: scaleX(1);
            }
            &.active {
                color: white;
                border: 2px solid white;
            }
        }
    }
`;

export default Modal;
