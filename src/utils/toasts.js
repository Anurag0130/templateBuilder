import { toast } from "sonner";


export function successAlert(message) {
  toast.success(message, {
    duration: 3000,
  });
}


export function errorAlert(message) {
  toast.error(message, {
    duration: 3000,
  });
}


export function warningAlert(message) {
  toast.warning(message, {
    duration: 3000,
  });
}


export function infoAlert(message) {
  toast.info(message, {
    duration: 3000,
  });
}
