"use client"
import { useEffect, useState } from "react";
import Card from "./Card";
import Form from "./Form";

export default function Home() {

    const [notes,setNotes] = useState([]);
    const [edit,setEdit] = useState({
      status:false,
      id:''
    });
  
    const [title, setTitle ] = useState('');
    const [ desc, setDesc ] = useState('');



  useEffect(()=>{
    const fetchNotes = async()=>{
      
      try{
        const res = await fetch('http://localhost:8000/api/');
        console.log(res);
        const resData = await res.json();
        setNotes(resData.data);
      }catch(error){
        console.log("Unable to get data");
      }

    }

    fetchNotes();
  },[]);





  return (
    <div className="mainContainer w-[100%] min-h-[100vh]  bg-[#ecebeb] flex justify-center items-center overflow-x-hidden">

      <div className="innerContainer w-[80%] h-[100%]">

        <div className="innerContainer w-[100%] mt-[5rem]">

          <Form setDesc={setDesc} setEdit={setEdit} edit={edit}  title={title} desc={desc} setTitle={setTitle} setNotes={setNotes}/>

          <div className="lowerContainer w-[100%] flex justify-center items-center flex-wrap gap-[1rem] mt-[5rem] ">

          {
            notes.map((data,index)=>{
                return <Card setNotes={setNotes} setDesc={setDesc} setEdit={setEdit} edit={edit} data={data} title={title} desc={desc} setTitle={setTitle} key={index} />
            })
          }
            


          </div>

        </div>

      </div>

    </div>
  );
}
