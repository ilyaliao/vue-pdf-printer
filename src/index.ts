import { type Component, h, render } from 'vue'

interface Settings {
  readonly title: string
}

export class VuePdfPrinter {
  /**
   * The rendered Vue component
   */
  private _el: HTMLElement | null = null
  /**
   * The generated iframe element for printing
   */
  private _iframe: HTMLIFrameElement | null = null
  /**
   * The window object of the iframe
   */
  private _window: Window | null = null
  /**
   * The document object of the iframe
   */
  private _document: Document | null = null

  constructor(
    component: Component,
    public settings: Settings,
  ) {
    this._el = this.getEl(component)

    if (!this._el)
      throw new Error('Failed to create HTMLElement from component.')

    this.createPrintWindow()
    this.write()
  }

  /**
   * Converts the provided Vue component to an HTMLElement
   *
   * @param com Vue component
   * @returns HTMLElement
   */
  getEl(com: Component): HTMLElement {
    const vnode = h(com)
    const container = document.createElement('div')
    render(vnode, container)
    return vnode.el as HTMLElement
  }

  /**
   * Creates an iframe to hold the content to be printed
   */
  createPrintWindow() {
    const iframe = document.createElement('iframe')
    Object.assign(iframe.style, {
      border: '0px',
      position: 'absolute',
      width: '0px',
      height: '0px',
      right: '0px',
      top: '0px',
    })
    iframe.id = 'vue-pdf-printer'
    document.body.appendChild(iframe)

    this._iframe = iframe
    this._window = iframe.contentWindow
    this._document = iframe.contentWindow?.document || null

    if (!this._document)
      throw new Error('Failed to access iframe document.')
  }

  /**
   * Generates the doctype for the HTML file
   */
  docType() {
    return '<!DOCTYPE html>'
  }

  /**
   * Retrieves all the CSS styles of the target file and adds them to the HTML file for printing
   */
  getHead() {
    const links = (Array.from(document.querySelectorAll('link[type="text/css"]')) as HTMLLinkElement[])
      .map(link => `<link type="text/css" rel="stylesheet" href="${link.href}">`)
      .join('')

    const style = Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          return Array.from(sheet.cssRules).map(rule => rule.cssText).join('')
        }
        catch (e) {
          console.warn(`Error processing stylesheet: ${sheet.href}`, e)
          return ''
        }
      })
      .join('')

    const printStyles = `
      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
        }
        @page {
          margin: 0;
          size: A4 portrait;
        }
      }
    `

    return `<head><title>${this.settings.title}</title>${links}<style type="text/css">${style}</style><style>${printStyles}</style></head>`
  }

  /**
   * Retrieves the HTML content of the target file
   */
  getBody() {
    return `<body>${this._el!.outerHTML}</body>`
  }

  /**
   * Writes the generated HTML file into the iframe
   */
  write() {
    if (!this._document)
      throw new Error('Document is null')

    const htmlEl = document.documentElement
    const langAttr = htmlEl.getAttribute('lang') || ''
    const classAttr = htmlEl.getAttribute('class') || ''

    this._document.open()
    this._document.write(`${this.docType()}<html lang="${langAttr}" class="${classAttr}">${this.getHead()}${this.getBody()}</html>`)
    this._document.close()
  }

  /**
   * Executes the print
   */
  print() {
    if (!this._window)
      throw new Error('Window is null')
    if (!this._iframe)
      throw new Error('Iframe is null')

    const beforePrintHandler = () => { }
    const afterPrintHandler = () => {
      document.body.removeChild(this._iframe!)
      window.removeEventListener('beforeprint', beforePrintHandler)
      window.removeEventListener('afterprint', afterPrintHandler)
    }

    window.addEventListener('beforeprint', beforePrintHandler)
    window.addEventListener('afterprint', afterPrintHandler)

    this._window.focus()
    this._window.print()
  }

  /**
   * Previews the print content in a new window
   */
  preview() {
    if (!this._document)
      throw new Error('Document is null')

    const previewWindow = window.open('', 'Print Preview', 'width=800,height=600')

    if (!previewWindow)
      throw new Error('Preview window is null')

    previewWindow.document.write(this._document.documentElement.outerHTML)
  }
}
