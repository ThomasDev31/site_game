import { useEffect } from "react";
import styled from "styled-components";
function Timer({ count, startTimer, setStartTimer, setCount, setDisplayResult, setdisplayTimer, displayTimer, setShowResults, chrono }) {
    
    useEffect(() => {
        if (!startTimer) return;
        if (count < 0) {
            setStartTimer(false);
            return;
        }
        setdisplayTimer(true)
        let intervalId
        if(chrono){
            intervalId = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000);
        }else{
            intervalId = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);
        }
        
        return () => clearInterval(intervalId);
    }, [startTimer, count]);

    const formatTime = (seconds) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, "0");
        const sec = String(seconds % 60).padStart(2, "0");
        return `${min}:${sec}`;
    };
    useEffect(() => {
        if (count === 0 && !chrono) {
            setStartTimer(false)
            setDisplayResult(true)
            setShowResults(true)
        }
    })
    return (
        <>
            <P className={displayTimer ? "active" : ""}>⏱️ Temps restant : {formatTime(count)}</P>
        </>
    );
}
const P = styled.p`
    text-align:center;
    font-size:2rem;
    display:none;
    overflow:hidden;
    &.active{
        display:block;
    }
`

export default Timer;