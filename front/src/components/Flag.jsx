import { useEffect, useState } from "react";

function Flag() {
    const [error, setError] = useState("");
    const [flags, setFlags] = useState([]);
    const [isLoading, setIsLoading] = useState(true)


    const fetchData = async () => {
        try{
            const reponse = await fetch("http://127.0.0.1:5000/jeu/flag");
            if(!reponse.ok){
                throw new Error("Erreur lors du téléchargement des pays");   
            }
            const data = await reponse.json();
            setFlags(data);
            console.log(data.flag);

        }catch(err){
            setError(err)
        }finally{
            setIsLoading(false)
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {!isLoading && flags && (
                    <div>
                        {flags.flag.map(f => (
                            <img src={`https://flagcdn.com/256x192/${f}.png`} key={f} />
                        ))}
                    </div>
                )}
        </>
    );
}

export default Flag;
