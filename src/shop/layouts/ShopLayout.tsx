import { Outlet, useLocation } from "react-router-dom";
import { CustomHeader } from "../components/CustomHeader"; 
import CustomFooter from "../components/CustomFooter";
import { useEffect } from "react";
import Cart from "../components/CustomKart";

const ShopLayout = () => {

  const {pathname} = useLocation(); 
  useEffect(() => {
    if(pathname){

      window.scrollTo({top:0,behavior: 'auto'}); 
    }
  }, [pathname])

  
  
  return (
    <div className="min-h-screen bg-background">
      <CustomHeader /> 
      <Outlet />
      <Cart />
      <CustomFooter />
    </div>
  )
}

export default ShopLayout