import { toast } from 'vue3-toastify'

export function useToast() {
  const success = (message: string) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 2000,
    })
  }

  const error = (message: string) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 2000,
    })
  }

  const warning = (message: string) => {
    toast.warning(message, {
      position: 'top-right',
      autoClose: 2000,
    })
  }

  const httpError = (messages: string[] | string) => {
    if (Array.isArray(messages)) {
      messages.forEach((message) => toast.error(message))
    } else toast.error(messages);
  }

  return {
    toast,
    success,
    error,
    warning,
    httpError,
  }
}
