import { Link } from "react-router";
import styled from "styled-components";

function Header() {
    return (
        <>
            <HeaderStyled>
                <nav>
                    <Link to={"/"}>Accueil</Link>
                    <Link to={"/jeu/mot"}>Pendu</Link>
                    <Link to={"/jeu/number"}>Juste prix</Link>
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
    }
`;

export default Header;
