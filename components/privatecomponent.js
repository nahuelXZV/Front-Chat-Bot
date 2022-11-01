import React, { Component } from "react";
import {useRouter} from "next/router";

const PrivateComponent = () => {
    console.log("ingresa");
    if (typeof window !== 'undefined') {
        const router = useRouter();
        console.log('we are running on the client');
        const auth = localStorage.getItem("user");        
        if(auth){
          return <></>
        } else {
          router.push("login");
        }        
    } else {
        console.log('we are running on the server');
    }    
}

export default PrivateComponent