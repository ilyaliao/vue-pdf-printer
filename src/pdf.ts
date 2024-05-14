import { type Component, h, render } from 'vue'

interface Settings {
  readonly title: string
}

export class PDFPrinter {
  el: HTMLElement | null = null
  iframe: HTMLIFrameElement | null = null
  window: Window | null = null
  document: Document | null = null

  constructor(component: Component, public settings: Settings) {
    this.el = this.getEl(component)

    if (!this.el)
      throw new Error('el is null')

    this.init()
  }

  getEl(com: Component) {
    const vnode = h(com)

    const node = document.createElement('div')

    render(vnode, node)

    return vnode.el as HTMLElement
  }

  init() {
    this.createPrintWindow()

    this.write()
  }

  createPrintWindow() {
    const iframe = document.createElement('iframe')
    iframe.style.border = '0px'
    iframe.style.position = 'absolute'
    iframe.style.width = '0px'
    iframe.style.height = '0px'
    iframe.style.right = '0px'
    iframe.style.top = '0px'
    iframe.setAttribute('id', 'cofcat')
    document.body.appendChild(iframe)

    this.iframe = iframe
    this.window = iframe.contentWindow
    this.document = iframe.contentWindow!.document
  }

  write() {
    if (!this.document)
      throw new Error('document is null')

    const htmlEl = document.documentElement
    const langAttr = htmlEl.getAttribute('lang')
    const classAttr = htmlEl.getAttribute('class')

    this.document.open()
    this.document.write(`${this.docType()}<html lang="${langAttr}" class="${classAttr}">${this.getHead()}${this.getBody()}</html>`)
    this.document.close()
  }

  docType() {
    return '<!DOCTYPE html>'
  }

  getHead() {
    let links = ''
    let style = ''

    Array.from(document.querySelectorAll('link')).forEach((link: HTMLLinkElement) => {
      if (link.type === 'text/css')
        links += `<link type="text/css" rel="stylesheet" href="${link.href}" >`
    })

    const domStyle = document.styleSheets
    if (domStyle && domStyle.length > 0) {
      for (let i = 0; i < domStyle.length; i++) {
        const sheet = domStyle[i]
        try {
          const rules = Array.from(sheet.cssRules)
          if (rules) {
            for (const rule of rules)
              style += rule.cssText
          }
        }
        catch (e) {
          console.warn(`Error processing stylesheet: ${sheet.href}`, e)
        }
      }
    }

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

    return `<head><title>title</title>${links}<style type="text/css">${style}</style><style>${printStyles}</style></head>`
  }

  getBody() {
    return `<body>${this.el!.outerHTML}</body>`
  }

  print() {
    if (!this.window)
      throw new Error('window is null')

    if (!this.iframe)
      throw new Error('iframe is null')

    const beforePrintHandler = () => {
    }

    const afterPrintHandler = () => {
      document.body.removeChild(this.iframe!)
      window.removeEventListener('beforeprint', beforePrintHandler)
      window.removeEventListener('afterprint', afterPrintHandler)
    }

    window.addEventListener('beforeprint', beforePrintHandler)
    window.addEventListener('afterprint', afterPrintHandler)

    this.window.focus()
    this.window.print()
  }

  preview() {
    if (!this.document)
      throw new Error('document is null')

    const previewWindow = window.open('', 'Print Preview', 'width=800,height=600')

    if (!previewWindow)
      throw new Error('previewWindow is null')

    previewWindow.document.write(this.document.documentElement.outerHTML)
  }
}
