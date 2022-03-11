import React from "react";
import { useLocation } from "react-router-dom";


const higherOrderFunction = (Component)=>{
    return function Higer(props){ 
         const location = useLocation()

        return <Component location={location}/>
    }
}

export default higherOrderFunction;