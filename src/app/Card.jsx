import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const Card = ({ data, setNotes,setEdit,edit,setTitle,setDesc,desc,title }) => {

    const handleEdit = async()=>{
        const status = {
            status:true,
            id:data._id
        }
        setEdit(status);
        setTitle(data.title);
        setDesc(data.desc);
    }

    const handleDelete = async (id) => {
        try {
            const deleted = await fetch(`${NEXT_URL}/api/${id}`, {
                method: "delete"
            });
            console.log(deleted);
            const resData = await deleted.json();
            setNotes(resData.data);
        } catch (error) {
            console.log("unable to delete", error);
        }
    }

    return (
        <>
            <div className="noteCard w-[30%] min-h-[8rem] px-[.5rem] py-[.5rem] rounded-[.7rem] bg-[#fff] ">

                <p className="title text-[1.5rem] font-semibold leading-tight"> {data.title}</p>
                <p className="description text-[#353535]">{data.desc}</p>

                <div className="lowerButtons w-[100%] flex justify-end gap-[.5rem]">

                    <button className="px-[1rem] py-[.3rem] cursor-pointer rounded-[.5rem] bg-[#6bfc6b] text-[#ffffff]" onClick={()=>handleEdit(data)}><MdEdit /></button>
                    <button className="px-[1rem] py-[.3rem] cursor-pointer rounded-[.5rem] bg-[#ff6347] text-[#ffffff]" onClick={() => handleDelete(data._id)}><AiFillDelete /></button>

                </div>
            </div>
        </>
    )
}

export default Card;