import { useEffect,useState } from "react";

export default function App()
{
    const[list,setList]=useState([]);
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");

    const load=async ()=>{
        const res=await fetch("http://localhost:5000/get");
        setList(await res.json());
    };

    useEffect(()=>{load();},[]);
    const add=async ()=>{
        await fetch("http://localhost:5000/add",
            {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({name,email})
            }
        );
        load();
    };

    const del=async (id)=>{
        await fetch(`http://localhost:5000/delete/${id}`,{
            method:"DELETE"
        });
        load();
    };

    return(
        <div>
            <h2>Student System</h2>
            <input placeholder="Name" onChange={e=>setName(e.target.value)}/>
            <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
            <button onClick={add} >Add </button>
           {
            list.map(s=>(
                <div key={s._id}>
                {s.name}-{s.email}
                <button onClick={()=>del(s._id)}>Delete</button></div>
            ))
           } 
        </div>
    );
}