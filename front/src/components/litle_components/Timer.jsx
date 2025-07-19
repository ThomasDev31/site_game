import { useEffect, useState } from "react";
import styled from "styled-components";
function Timer({count, startTimer, setStartTimer, setCount, setDisplay}) {
    
    useEffect(() => {
        if (!startTimer) return;
        if (count < 0) {
            setStartTimer(false);
            return;
        }
        const intervalId = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [startTimer, count]);

    const formatTime = (seconds) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, "0");
        const sec = String(seconds % 60).padStart(2, "0");
        return `${min}:${sec}`;
    };
    useEffect(() => {
        if (count === 0) {
            setStartTimer(false)
            setDisplay(true)
        }
    })
    return (
        <>
            <P>⏱️ Temps restant : {formatTime(count)}</P>
        </>
    );
}
const P = styled.p`
    text-align:center;
    font-size:2rem;
`

export default Timer;