"use client"

import { useEffect, useState } from "react";

const Form = ({ setTitle, setDesc, title, desc, setEdit, edit,setNotes }) => {
    const [error,setError] = useState('');

    const updateNote = async (e) => {
            e.preventDefault();
            if(title.length < 1){
                setError('Enter all fields');
                return;
            } 
            if(desc.length < 10){
                setError('description should be more then 10 char');
                return;
            } 
            try {
                e.preventDefault();
                const data = { title, desc };
                const res = await fetch(`http://localhost:8000/api/${edit.id}`, {
                    'method': "put",
                    'headers': {
                        "content-type": "application/json",
                    },
                    'body': JSON.stringify(data),
                });
                console.log(res);
                setTitle("");
                setDesc("");
                setEdit({status:false,id:''});
                const resData = await res.json();
                setNotes(resData.data);
            } catch (err) {
                console.log("Unable to post", err);
            }
    }

    const handleTitle = (e) => {
        // console.log();
        setError('');
        const value = e.target.value;
        setTitle(e.target.value);
    }
    
    const handleDesc = (e) => {
        setError('');
        const value = e.target.value;
        setDesc(value);
    }



    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if(title.length < 1 && !desc){
                setError('Enter all fields');
                return;
            } 
            if(desc.length < 10){
                setError('description should be more then 10 char');
                return;
            } 
            const data = { title, desc };
            const res = await fetch('http://localhost:8000/api/', {
                'method': "post",
                'headers': {
                    "content-type": "application/json",
                },
                'body': JSON.stringify(data),
            });
            console.log(res);
            setTitle("");
            setDesc("");
            const resData = await res.json();
            setNotes(resData.data);
        } catch (err) {
            console.log("Unable to post", err);
        }
    }
    return (
        <>
            <form className="w-[100%] flex justify-center items-center flex-col gap-[1rem]">
                <input value={title} onChange={handleTitle} type="text" name="title" id="title" placeholder="Title..." className="w-[50%] px-[1rem] py-[.5rem] bg-[#ffffff] rounded-[.5rem] border-none outline-none " required />
                <textarea value={desc} onChange={handleDesc} placeholder="Description" name="desc" id="desc" className="w-[50%] px-[1rem] py-[.5rem] bg-[#ffffff] rounded-[.5rem] border-none outline-none " required ></textarea>

                {edit.status === true ?<button className="w-[50%] bg-[#f09c00] text-[#ffffff] py-[.5rem] rounded-[.5rem] cursor-pointer" onClick={updateNote}>Update</button>:
                <button className="w-[50%] bg-[#f09c00] text-[#ffffff] py-[.5rem] rounded-[.5rem] cursor-pointer" onClick={handleSubmit}>Submit</button>}
                {error && <p className="text-[.8rem] text-[tomato]">{error}</p>}
            </form>

        </>
    )
}

export default Form