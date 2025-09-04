import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../service/authService";
import { useTheme } from "../contex/TheemProvider";

function Logout() {
  const navigate = useNavigate();
  const {setAuth} = useTheme();
  const logout = async () => {
    const out = await authService.logOut();
    navigate("/",{replace:true});
    setAuth(false);
    localStorage.removeItem("authUser")
  };
  return (
    <button
      onClick={logout}
      className="flex items-center w-full px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors duration-200"
    >
      Logout
    </button>
  );
}

export default Logout;
