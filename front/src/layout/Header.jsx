import { NavLink, Link } from "react-router";
import styled from "styled-components";

function Header({ isDisplay, setIsDisplay }) {
    return (
        <>
            <HeaderStyled className={isDisplay ? ` active` : ``}>
                <nav>
                    <Link
                        to={"/"}
                        onClick={() => setIsDisplay(!isDisplay)}
                        className={isDisplay ? `name-site active` : `name-site`}
                    >
                        GameSite
                    </Link>
                    <div
                        className={
                            isDisplay
                                ? `container-game active`
                                : `container-game`
                        }
                    >
                        <NavLink
                            to={"/jeu/mot"}
                            onClick={() => setIsDisplay(false)}
                        >
                            Pendu
                        </NavLink>
                        <NavLink
                            to={"/jeu/number"}
                            onClick={() => setIsDisplay(false)}
                        >
                            Juste prix
                        </NavLink>
                        <NavLink
                            to={"/jeu/flag"}
                            onClick={() => setIsDisplay(false)}
                        >
                            Jeu des Drapeaux
                        </NavLink>
                        <NavLink
                            to={"/jeu/tusmo"}
                            onClick={() => setIsDisplay(false)}
                        >
                            Tusmo
                        </NavLink>
                    </div>
                </nav>
            </HeaderStyled>
        </>
    );
}

const HeaderStyled = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    background-color: rgba(0, 0, 0, 0.8);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8);
    overflow-y: hidden;
    top: 15px;
    border-radius: 50px;
    height: 70px;
    max-width: 1240px;
    margin: auto;
    padding: 0px 20px;
    margin-bottom: 50px;
    z-index: 10;
    nav {
        display: flex;
        gap: 10px;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .name-site {
            font-size: 2rem;
            font-weight: bold;
            color: white;
            text-shadow: white 1px 0 10px;
            &:hover{
                text-shadow: white 2px 0 15px;
            }
        }
        .container-game {
            overflow-y: hidden;
            display:flex;
            a {
                position: relative;
                transition: color .3s ease-in-out;
                &::after{
                    content:"";
                    right:0;
                    left:0;
                    background-color:white;
                    bottom:5px;
                    position:absolute;
                    width:0;
                    height:2px;
                    z-index:20;
                    margin:auto;
                    transition: width 0.3s ease-in-out;
                }
                &:hover{
                    color:white;
                    &::after{
                        width:50px;
                    }
                    
                
                }
                &:nth-of-type(3):hover{
                    &::after{
                        width:120px;
                    }
                }
            }
        }
        a {
            color: lightgray;
            padding: 10px 20px;
            text-decoration: none;
            font-size: 1.5rem;
            &.active {
                color: white;
            }
        }
    }
    @media screen and (max-width: 1240px){
        width:80%;
    }
  
    @media screen and (max-width: 980px) {
        
        &.active {
            height: 100vh;
            overflow-y: hidden;
            margin-bottom: 0px;
            top: 0px;
            border-radius: 0;
            width:100%;
        }
        nav {
            display: flex;
            flex-direction: column;
            .container-game {
                position: absolute;
                top: 80px;
                opacity: 0;
                display: flex;
                flex-direction: column;
                text-align: center;
            }
            .container-game.active {
                position: relative;
                top: 0;
                opacity: 1;
                a {
                    font-size: 2rem;
                }
            }
            .name-site {
                width: 100%;
                text-align: center;
                font-size: 3rem;
                &.active {
                    position: absolute;
                    top: 50px;
                }
            }
        }
    }
      @media screen and (max-width: 940px){
        &.active {
            height: 100vh;
            overflow-y: hidden;
            margin-bottom: 0px;
            top: 0px;
            border-radius: 0;
            width:100%;
        }
    }
`;

export default Header;
