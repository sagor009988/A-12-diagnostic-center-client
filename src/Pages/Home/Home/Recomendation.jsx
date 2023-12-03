import { useState } from "react";
import SectionTitel from "../../../Shared/Serction Titel/SectionTitel";
import { useEffect } from "react";
import RecoCard from "./RecoCard";



const Recomendation = () => {

    const [reco,setReco]=useState()
    useEffect(()=>{
        fetch('recomendation.json')
        .then(res=>res.json())
        .then(data=>setReco(data))
    },[])

    return (
        <div>
            <SectionTitel subHeading={'--stay happy--'} Heading={'Doctor recomendation for Health'}></SectionTitel>
            {
                reco?.map(rec=><RecoCard key={rec.id}rec={rec}></RecoCard>)
            }
        </div>
    );
};

export default Recomendation;