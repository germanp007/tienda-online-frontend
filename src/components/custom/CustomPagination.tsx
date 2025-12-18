import { Button } from "@/components/ui/button" 
import { ChevronLeft, ChevronRight } from "lucide-react" 
import { useSearchParams } from "react-router"

interface PaginationProps {
  totalPages: number | undefined
}

export default function CustomPagination({ totalPages= 1 }: PaginationProps) {
 
    const [searchParams, setSearchParams] = useSearchParams(); 
    const queryPage = searchParams.get('page') ?? '1';
     const tabs = searchParams.get("tab") 
    const page = isNaN(+queryPage) ? 1 : +queryPage
 
    const handlePageChange = (page: number)=>{
        if(page < 1 || page > totalPages) return;

        searchParams.set('page', page.toString());

        setSearchParams(searchParams)
    }
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size="sm" onClick={()=> handlePageChange(page - 1) }>
        <ChevronLeft className="h-4 w-4 cursor-pointer" />
        Previous
      </Button>

      {Array.from({length: tabs === 'favorites' ? 1 : totalPages}).map((_, index) => ( 
            <Button
            key={index}
              // variant={ page === index + 1 ? "default" : "outline"}
              variant={ page === index + 1 || tabs === 'favorites' ? "default" : "outline"}
              size="sm"
            onClick={() => handlePageChange(index + 1 )}
            >
              {index + 1}
            </Button>  
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
        <ChevronRight className="h-4 w-4" />  
       </Button>
    </div>
  )
}