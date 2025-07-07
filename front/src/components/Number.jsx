import { useState, useEffect } from "react";
function Number() {
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/jeu/number", { credentials: "include" });
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des données");
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
    
    const response = await fetch("http://127.0.0.1:5000/jeu", {
      method: "POST",
      credentials: "include" ,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number }),
    });
    const value = await response.json();
    console.log(value);
    setMessage(value.message || "");
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
          <form onSubmit={handlesubmit}>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <input type="submit" value="envoyer" />
          </form>
          <p>{message}</p>
        </>
      )}
    </>
  );
}

export default Number;