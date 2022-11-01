import React, { Component } from "react";

const LoginName = () => {    
    if (typeof window !== 'undefined') {
        let user = localStorage.getItem('user');        
        user = JSON.parse(user);        
        //return <h3 className="font-bold ml-2"> {user.nombre} </h3>;
        return <span className="mx-1 font-bold">{user.nombre}</span>;
    }    
}

export default LoginName