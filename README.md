# vue-pdf-printer

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

<p align="center">English | <a href="./README.zh-TW.md">繁體中文</a></p>

<br>
<br>

A lightweight tool for printing Vue components to PDF.

## ✨ Features

Inspired by [vue3-print-nb](https://github.com/Power-kxLee/vue-print-nb), but:

- More lightweight
- Supports Typescript
- No need to render the component to be printed, directly convert the component to PDF

## 🚀 Usage

### `.preview()`

Opens a new window to preview the printed PDF.

### `.print()`

Executes the print.

### Example

```vue
<script setup lang="ts">
import { h, onMounted, shallowRef } from 'vue'
import { VuePdfPrinter } from 'vue-pdf-printer'

import Com from './components/Com.vue'

const printer = shallowRef<VuePdfPrinter>()

onMounted(() => {
  // use h to pass props into the component, or you can pass the component directly without using h.
  PDF.value = new VuePdfPrinter(
    h(Com, { title: 'some title' }),
    {
      title: 'file title',
    },
  )

  // open print window
  printer.value.print()
})
</script>
```

## 📄 License

[MIT](./LICENSE) License © 2024-PRESENT [CofCat](https://github.com/CofCat456)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/vue-pdf-printer?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/vue-pdf-printer
[npm-downloads-src]: https://img.shields.io/npm/dm/vue-pdf-printer?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/vue-pdf-printer
[bundle-src]: https://img.shields.io/bundlephobia/minzip/vue-pdf-printer?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=vue-pdf-printer
[license-src]: https://img.shields.io/github/license/CofCat456/vue-pdf-printer.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/CofCat456/vue-pdf-printer/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/vue-pdf-printer
