
import axios from "axios";
import React from "react";
import { use } from "react";
import { useEffect,useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const EditPage = () => {

    const [data, setData] = useState({});
    const [cateen_id , setCanteen_id] = useState("");
    const [catogery,setCatogery] = useState(""); 
   
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log(location.state);
        setData(location.state.item);
    },[location])

    useEffect(()=>{
        setCanteen_id(location.state.canteen_id);
    },[location]
  )

     useEffect(()=>{
        setCatogery(location.state.category);
    },[location]
    )


    useEffect(()=>{
        console.log("item",data);
    },[data])

    useEffect(()=>{
        console.log("canteen_id",cateen_id);
    },[cateen_id])
    
    useEffect(()=>{
        console.log("catogery",catogery);
    },[catogery])

    // functions 

    const close = ()=>{
      navigate("/canteen/home",{state:{ scrolly: location.state.scrolly }});
    }


    const Submit =(e)=>{
        e.preventDefault();
        console.log("submit");
        console.log(data);
        
        if(catogery === "special"){
            axios.put(`http://localhost:5000/special/updateSpecial?_id=${data._id}`,data)
            .then((response)=>{
                console.log("Success:",response);
                navigate("/canteen/home",{state:{ scrolly: location.state.scrolly }});
            })
            .catch((error)=>{
                console.error("Error:",error);
            })
            return
        }

        axios.put(`http://localhost:5000/menu/updatefooditem?canteen_id=${cateen_id}&catogery=${catogery}`, data)
        .then((response)=>{
            console.log("Success:",response);
            navigate("/canteen/home",{state:{ scrolly: location.state.scrolly }});
        })
        .catch((error)=>{
            console.error("Error:",error);
        })
    }

  return (
    <div style={{backgroundImage:`url(${data.image})`}} className="fixed inset-0 flex items-center justify-center bg-blue-600 bg-opacity-50 p-4 bg-cover bg-center ">
    <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white w-full max-w-md md:max-w-lg lg:max-w-xl p-6 rounded-lg shadow-lg relative z-10 ">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold text-gray-800">Edit Item</h2>
          <button onClick ={()=>close()}className="text-red-500 text-xl font-bold hover:text-red-700 transition">
            X
          </button>
        </div>

        {/* Form */}
        <div className="mt-4">
          <form className="space-y-4">
            {/* Name Field */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={(e)=>setData({...data,name:e.target.value})}
                placeholder="Enter Name"
                className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price Field */}
            <div className="flex flex-col">
              <label htmlFor="price" className="text-gray-700 font-medium">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={data.price}
                onChange={(e)=>setData({...data,price:e.target.value})}
                placeholder="Enter Price"
                className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col">
              <label htmlFor="image" className="text-gray-700 font-medium">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e)=>setData({...data,image:e.target.files[0]})}
                className="mt-1 p-2 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="text-gray-700 font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={data.description}
                placeholder="Enter Description"
                onChange={(e)=>setData({...data,description:e.target.value})}
                className="mt-1 p-2 border rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button onClick={Submit} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
