export function useModal() {
  const open = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    let modal = KTModal.getInstance(element)

    if (!modal) {
      modal = new KTModal(element)
    }

    modal.show()
  }

  const close = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const modal = KTModal.getInstance(element)
    modal?.hide()
  }

  return { open, close }
}
