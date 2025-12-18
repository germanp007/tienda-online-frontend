import { useAuthStore } from "@/auth/store/auth.store"
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";


export const AuthenticatedRoute = ({children}:PropsWithChildren)=>{
    const { authStatus } = useAuthStore()
    if(authStatus === 'chequeando') return null;
    if(authStatus === 'no-autenticado') return <Navigate to={'/auth/login'} />;
    return children;
};
export const NotAuthenticatedRoute = ({children}:PropsWithChildren)=>{
    const { authStatus } = useAuthStore()
    if(authStatus === 'chequeando') return null;
    if(authStatus === 'autenticado') return <Navigate to={'/'} />;
    return children;
};

export const IsAdminRoute = ({children}:PropsWithChildren)=>{
    const { authStatus, isAdmin } = useAuthStore();
    if(authStatus === 'chequeando') return null;
    if(!isAdmin()) return <Navigate to={'/'} />
    return children;
}