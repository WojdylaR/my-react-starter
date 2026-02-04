import {toast} from "react-toastify";

export const notifications = {
    success,
    warning,
    error,
}

function success(message: string | undefined = '')  {
    return notification(toast.success, 'Succès ! ' + message)
}

function warning(message: string | undefined = 'Il y a un problème...')  {
    return notification(toast.warning, message)
}

function error(message: string | undefined = '') {
    return notification(toast.error, 'Une erreur est survenue ! ' + message)
}

function notification(toastNotification: Function, message: string)  {
    return toastNotification(message, {
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'notifications',
    });
}