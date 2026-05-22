import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({children}){
   const {user}=useAuth();

   if(user){
    return (children)
   }
   return (
    <Navigate to="/login"></Navigate>
   )
}