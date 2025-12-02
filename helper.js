import { toast } from "sonner";

export function successAlert(message) {
    console.log('message',message)
    toast.success(message, {
        duration: 5000,
    });
}

