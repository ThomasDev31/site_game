import { useEffect, useRef } from "react";

function PenduCanva({ life }) {
    const canvaRef = useRef(null);

    useEffect(() => {
        const canvas = canvaRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#00000";


        ctx.beginPath();
        ctx.moveTo(50, 100);
        ctx.lineTo(130, 190);
        ctx.moveTo(60, 190);
        ctx.lineTo(60, 10);
        ctx.lineTo(110, 10);
        ctx.lineTo(110, 30);
        ctx.stroke();

        // Draw head
        if(life <= 5){
            ctx.beginPath();
            ctx.arc(110, 45, 15, 0, Math.PI * 2);
            ctx.stroke();
        }
        // Draw body
        if(life <= 4){
            ctx.beginPath();
            ctx.moveTo(110,60);
            ctx.lineTo(110,110);
            ctx.stroke();
        }
        // Draw left hand
        if(life <= 3){
            ctx.beginPath();
            ctx.moveTo(110,70);
            ctx.lineTo(80,90);
            ctx.stroke();
        }
        // Draw right hand
        if(life <= 2){
            ctx.beginPath();
            ctx.moveTo(110,70);
            ctx.lineTo(140,90);
            ctx.stroke();
        }
        // Draw left leg
        if(life <= 1){
            ctx.beginPath();
            ctx.moveTo(110,110);
            ctx.lineTo(80,130);
            ctx.stroke();
        }
        // Draw right leg
        if(life <= 0){
            ctx.beginPath();
            ctx.moveTo(110,110);
            ctx.lineTo(140,130);
            ctx.stroke();
        }
    }, [life]);

    return <canvas ref={canvaRef} width={300} height={200} ></canvas>;
}
export default PenduCanva;
