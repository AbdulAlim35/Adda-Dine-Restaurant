import { useLocation, Navigate } from "react-router-dom";
import { useTheme } from "../contex/TheemProvider";


export default function ProtectedRoute({children}){
  const {isAuth} =useTheme();
  
  const data =useLocation()

   return isAuth ? children : <Navigate to="/" state={data.pathname} replace />
}