import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, NavLink, useLocation, useSearchParams } from "react-router";
import CustomLogo from "@/components/custom/CustomLogo";
import { useEffect, useRef, type KeyboardEvent  } from "react";  
import { useCartStore } from "../store/Cart.store";
import { useAuthStore } from "@/auth/store/auth.store";

export const CustomHeader = () => {
  
  const { pathname } = useLocation();
  const { logout, authStatus, isAdmin } = useAuthStore();
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams(); 
  const { setIsCartOpen, getTotalItems} = useCartStore() // Context
 

  const totalItems = getTotalItems();

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>)=>{  
    if(event.key !== 'Enter') return;
    if(searchRef.current){

      searchParams.delete('limit')
      searchParams.delete('page')
      searchParams.delete('sizes')
      searchParams.set('query',searchRef.current?.value); 
      setSearchParams(searchParams)
    }
  } 
 useEffect(() => { 
  if(pathname){ 

      searchRef.current!.value = '' 
  }

 }, [pathname])
 
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <CustomLogo />
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "underline underline-offset-4" : ""
                }`
              }
            >
              Todos
            </NavLink>
            <NavLink
              to={"/gender/men"}
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary ${ 
                  isActive ? "underline underline-offset-4" : ""
                }`
              }
            >
              Hombres
            </NavLink>
            <NavLink
              to={"/gender/women"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "underline underline-offset-4" : ""
                }`
              }
            >
              Mujeres
            </NavLink>
            <NavLink
              to={"/gender/kid"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "underline underline-offset-4" : ""
                }`
              }
            >
              Niños
            </NavLink>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center justify-center space-x-4">
            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  ref={searchRef}
                  name='search'
                  placeholder="Buscar productos..."
                  className="pl-9 w-64 h-9"
                  onKeyDown={handleSearch}
                />
              </div>
            </div>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            {
              authStatus === 'autenticado' ? 
              <Button 
               onClick={logout}
              variant="outline" size="sm" className="py-2 px-4">
              Logout
            </Button>
            :
             <Link to={'/auth/login'}>
            <Button variant="default" size="sm" className="py-2 px-4">
              Login
            </Button> 
             </Link>
            }

            {
              isAdmin() && 

             <Link to={'/admin'}>
            <Button variant="destructive" size="sm" className="py-2 px-4">
              Admin
            </Button>
             </Link>
            }

            {  authStatus === 'autenticado' && <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={setIsCartOpen}
            >
              <ShoppingCart className="h-5 w-5" />
               
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {totalItems}
                </span>
               
            </Button>}
          </div>
        </div>
      </div>
    </header>
  );
};
