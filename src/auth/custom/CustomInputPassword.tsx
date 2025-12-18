import { Input } from "@/components/ui/input";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";


interface Props{
  nameRef?: string
}

const CustomInputPassword = ({nameRef}:Props) => {
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed((previous) => !previous);
  };
  return (
    <div className="relative">
      <Input name={nameRef} id="password" type={isClosed ? "password" : "text"} required />
      <button onClick={handleClose} className="cursor-pointer">
        {isClosed ? (
          <EyeClosed className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2" />
        ) : (
          <EyeIcon className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2" />
        )}
      </button>
    </div>
  );
};

export default CustomInputPassword;
