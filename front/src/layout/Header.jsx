import { NavLink } from "react-router";
import styled from "styled-components";

function Header() {
    return (
        <>
            <HeaderStyled>
                <nav>
                    <NavLink to={"/"}>Accueil</NavLink>
                    <NavLink to={"/jeu/mot"}>Pendu</NavLink>
                    <NavLink to={"/jeu/number"}>Juste prix</NavLink>
                    <NavLink to={"/jeu/flag"}>Jeu des Drapeaux</NavLink>
                </nav>
            </HeaderStyled>
        </>
    );
}

const HeaderStyled = styled.header`
    position:sticky;
    height: 50px;
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    nav{
        display:flex;
        gap:10px;
        justify-content:space-around;
        align-items:center;
        width:100%;
        a{
            color:black;
            border:1px solid red;
            padding:10px 20px;
            text-decoration:none;
            &.active{
                background-color:red;
            }
        }
    }
`;

export default Header;

