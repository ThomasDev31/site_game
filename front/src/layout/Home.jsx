import { styled } from "styled-components";
import { Link } from "react-router";
import { picturesTab } from "../assets/datas";
function Home({isDisplay, setIsDisplay}) {
    console.log(picturesTab);
    return (
        <HomeContainer>
            <h1>Bienvenu sur GameSite</h1>
            <div className="container-pictures">
                {picturesTab.map((p, i) => (
                    <PictureLink
                        key={i}
                        to={p?.link}
                        style={{ backgroundImage: `url(${p?.image})` }}
                        onClick={() => setIsDisplay(false)}
                    >
                        <Overlay>{p?.name}</Overlay>
                    </PictureLink>
                ))}
            </div>
        </HomeContainer>
    );
}

const HomeContainer = styled.div`
    max-width: 1240px;
    width: 100%;
    margin: auto;
    border-radius: 25px;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.9);
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
    h1 {
        text-align: center;
        color: white;
        margin-bottom: 10px;
    }
    .container-pictures {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 35px;

        padding: 35px;
    }
    @media screen and (max-width: 1240px){
        width:80%;
    }
    @media screen and (max-width: 940px){
        .container-pictures{
            flex-direction:column;
        }
       
    }
    
`;
const PictureLink = styled(Link)`
    width: 35%;
    height: 250px;
    border-radius: 25px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    text-align: center;
    text-decoration: none;
    color: black;
    font-size: 1.5rem;
    text-transform: uppercase;
    position: relative;
    box-shadow: 5px 5px 10px rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease-in-out;
    &:hover {
        box-shadow: 8px 8px 15px rgba(255, 255, 255, 0.5);
    }
    @media screen and (max-width: 940px){
       width:100%;
       
    }
    
`;

const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    ${PictureLink}:hover & {
        background-color: rgba(0, 0, 0, 0);
        opacity:0;
    }
`;

export default Home;
