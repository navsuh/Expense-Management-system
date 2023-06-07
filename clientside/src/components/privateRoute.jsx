import React from "react";
import { Navigate } from "react-router-dom";
import { useBoundStore } from "../store";


export default function PrivateRoute({ children }) {
    const token = useBoundStore((store) => store.token);


if (!token || !sessionStorage.getItem("token")) {
    return <Navigate to="/login" />
}
return children;
}