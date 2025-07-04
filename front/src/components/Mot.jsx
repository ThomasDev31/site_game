import { useEffect, useState } from "react";

function Mot() {
    const [data, setData] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');
    
    const fetchData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/jeu/mot",{
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error("Erreur lors du chargmeent des données");
            }
            const value = await response.json();
            setData(value);
            console.log(value);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(text)
        const response = await fetch("http://127.0.0.1:5000/jeu/mot", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });
        const value = await response.json();
        setData(value)
        setText("");
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            {loading && <p>Chargement des données ... </p>}
            {error && <p>{error}</p>}
            {!error && !loading && data && (
                <>
                    <div>
                        {data.mot_masque.map((t, index) => (
                            <span key={index}>{t}</span>
                        ))}
                        {data.longueur}
                    </div>
                    <form onSubmit={handlesubmit}>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            maxLength={1}
                        />
                        <input type="submit" value="envoyer" />
                    </form>
                </>
            )}
        </>
    );
}

export default Mot;
