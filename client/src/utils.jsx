import toast from 'react-toastify';

const notifySuccess = (message) => {
  toast.success(message, {
    position: "top-right"
    });
}

const notifyError = (message) => {
  toast.error(message, {
    position: "top-right"
    });
}

export default { notifySuccess, notifyError };