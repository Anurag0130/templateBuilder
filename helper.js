import { toast } from "sonner";

export function successAlert(message) {
    console.log('message',message)
    toast.success(message, {
        duration: 9000,
    });
}


export function failedAlert(message){
     console.log('message',message)
    toast.failed(message, {
        duration: 1000,
    });
}
