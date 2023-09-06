import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const notify = (parameter,value="") => {
    if(parameter === "error"){
        toast.error('Some Error Occur!', {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
            });
    }
    else if(parameter === "wrong"){
        toast.warn('Invalid Email Address Or Password!', {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
            });
    }else if(parameter === "success"){
        toast.success(value,{
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
        })
    }
}