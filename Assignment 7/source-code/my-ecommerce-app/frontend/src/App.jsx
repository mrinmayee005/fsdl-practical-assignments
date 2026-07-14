import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [data, setData] = useState([]);

  const submitFeedback = () => {
    axios.post("http://localhost:5000/add", {
      name,
      feedback
    }).then(() => {
      axios.get("http://localhost:5000/view")
        .then(res => setData(res.data));
    });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/view")
      .then(res => setData(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Feedback System</h2>

      <input placeholder="Name"
        onChange={e => setName(e.target.value)} />
      <br /><br />

      <input placeholder="Feedback"
        onChange={e => setFeedback(e.target.value)} />
      <br /><br />

      <button onClick={submitFeedback}>Submit</button>

      <h3>Feedback List</h3>
      {data.map((item, index) => (
        <p key={index}>
          {item.name} : {item.feedback}
        </p>
      ))}
    </div>
  );
}

export default App;
