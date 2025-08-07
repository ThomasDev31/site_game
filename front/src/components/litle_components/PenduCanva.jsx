import { useEffect, useRef } from "react";
import styled from "styled-components";
function PenduCanva({ life }) {
    const canvaRef = useRef(null);

    useEffect(() => {
        const canvas = canvaRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#00000";

        // Draw gallows
        if (life < 5) {
            ctx.beginPath();

            ctx.moveTo(60, 150);
            ctx.lineTo(120, 150);

            ctx.moveTo(120, 150);
            ctx.lineTo(120, 190);

            ctx.moveTo(120, 150);
            ctx.lineTo(120, 190);

            ctx.moveTo(90, 10);
            ctx.lineTo(50, 190);

            ctx.moveTo(60, 150);
            ctx.lineTo(120, 190);
            ctx.moveTo(50, 190);
            ctx.lineTo(120, 190);

            ctx.moveTo(90, 10);
            ctx.lineTo(150, 10);

            ctx.moveTo(150, 10);
            ctx.lineTo(150, 45);
            ctx.stroke();
        }
        // Draw body
        if (life < 4) {
            ctx.beginPath();
            ctx.arc(165, 45, 15, 0, Math.PI * 2);
            ctx.stroke();
           
        }
        // Draw left hand
        if (life < 3) {
            ctx.beginPath();
            ctx.moveTo(165, 60);
            ctx.lineTo(150, 120);
            ctx.stroke();
        }
        // Draw right hand
        if (life < 2) {
            ctx.beginPath();
            ctx.moveTo(160, 75);
            ctx.lineTo(130, 95);

            ctx.moveTo(160, 75);
            ctx.lineTo(190, 95);
            ctx.stroke();
        }
        // Draw left leg
        if (life < 1) {
            ctx.beginPath();
            ctx.moveTo(150, 120);
            ctx.lineTo(120, 130);
            ctx.moveTo(150, 120);
            ctx.lineTo(170, 140);
            ctx.stroke();
        }
        // Draw right leg
        // if (life <= 0) {
            
        // }
    }, [life]);

    return <Canvas ref={canvaRef} width={300} height={200}></Canvas>;
}

const Canvas = styled.canvas`
    @media screen and (max-width:780px) {
       height:150px; 
    }
`
export default PenduCanva;
