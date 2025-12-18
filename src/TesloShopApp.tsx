import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from "react-router-dom";
import appRouter from "./router/router";  
import type { PropsWithChildren } from 'react'; 
import FullScreenLoading from './components/custom/FullScreenLoading';
import { useAuthStore } from './auth/store/auth.store';

const queryClient = new QueryClient();

const CheckAuthProvider = ({children}:PropsWithChildren)=>{
  const { checkAuth } = useAuthStore()
  const { isLoading } = useQuery({
    queryKey:['auth'],
    queryFn: checkAuth,
    retry: false,
    refetchInterval: 1000 * 60 * 90,
    refetchOnWindowFocus: true
  })

  if(isLoading) return <FullScreenLoading />

  return <>{children}</>
}


const TesloShopApp = () => {
  return (  
     <QueryClientProvider client={queryClient}> 
      <Toaster />
      <CheckAuthProvider>

      <RouterProvider router={appRouter} /> 
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    
  );
};

export default TesloShopApp;
