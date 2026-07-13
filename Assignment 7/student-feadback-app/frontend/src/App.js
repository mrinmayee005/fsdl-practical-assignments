import { useState, useEffect } from "react";

function App() {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  // fetch feedback
  const loadData = async () => {
    const res = await fetch("http://localhost:5000/all");
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    loadData();
  }, []);

  // submit feedback
  const submit = async () => {
    await fetch("http://localhost:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, message })
    });

    setName("");
    setMessage("");
    loadData();
  }

  return (
    <div style={{padding:20}}>
      <h2>Student Feedback</h2>

      <input 
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
      <br/><br/>

      <textarea 
        placeholder="Message"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
      />
      <br/><br/>

      <button onClick={submit}>Submit</button>

      <hr/>

      <h3>All Feedback</h3>

      {data.map((item, index)=>(
        <div key={index}>
          <b>{item.name}</b>: {item.message}
        </div>
      ))}

    </div>
  );
}

export default App;