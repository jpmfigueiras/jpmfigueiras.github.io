/** Copies text to the clipboard. Falls back to selecting the element's text when the API is unavailable. */
export async function copyText(text: string, fallbackEl?: HTMLElement | null): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    if (fallbackEl) {
      const range = document.createRange()
      range.selectNodeContents(fallbackEl)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
    return false
  }
}
