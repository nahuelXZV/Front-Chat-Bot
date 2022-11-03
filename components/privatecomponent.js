import React, { Component } from "react";
import { useRouter } from "next/router";

const PrivateComponent = () => {
  if (typeof window !== 'undefined') {
    // const router = useRouter();
    const auth = localStorage.getItem("user");
    if (auth) {
      return <></>
    } else {
      // router.push("login");
      window.location.href = "/login";
    }
  }
}

export default PrivateComponent