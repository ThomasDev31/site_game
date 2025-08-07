import styled from "styled-components";

function Loading() {

    return (<ContainerLoading>
    <h1>Chargement des données</h1></ContainerLoading>);
}
const ContainerLoading = styled.div`
    max-width:1240px;
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:auto;
    margin-top:50px;


`
export default Loading;