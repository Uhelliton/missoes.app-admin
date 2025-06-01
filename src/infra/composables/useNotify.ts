import toast from '@/infra/composables/useToast'

export const useNotify = () => {
  const success = (message: string) => {
    toast.success(message)
  }

  const warning = (message: string) => {
    toast.warning(message)
  }

  const httpError = (messages: string[] | string) => {
    if (Array.isArray(messages)) {
      messages.forEach((message) => toast.error(message))
    } else toast.error(messages);
  }

  return {
    success,
    warning,
    httpError
  }
}
