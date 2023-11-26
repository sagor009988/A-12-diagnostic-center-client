import { data } from "autoprefixer";
import { useEffect, useState } from "react";


const useTest = () => {
    const [loading,setLoading]=useState(true)
    const [tests,setTests]=useState([]);
    useEffect(()=>{
        setLoading(true)
        fetch('http://localhost:5000/tests')
        .then(res=>res.json())
        .then(data=>setTests(data))
    },[])
    return[tests]
};

export default useTest;