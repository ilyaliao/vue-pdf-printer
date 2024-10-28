# vue-pdf-printer

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

<p align="center"><a href="./README.md">English</a> | 繁體中文</p>

<br>
<br>

一個輕量化用來將 Vue 元件打印成 PDF 的工具。

## ✨ 特徵

受到 [vue3-print-nb](https://github.com/Power-kxLee/vue-print-nb) 的啟發, 但:

- 更輕量
- 支援 `Typescript`
- 無需渲染要打印的元件，直接將元件轉換成 PDF

## 🚀 使用

### `.preview()`

新開一個視窗，用來預覽打印後的 PDF。

### `.print()`

執行打印。

### Example

```vue
<script setup lang="ts">
import { h, onMounted, shallowRef } from 'vue'
import { VuePdfPrinter } from 'vue-pdf-printer'

import Com from './components/Com.vue'

const printer = shallowRef<VuePdfPrinter>()

onMounted(() => {
  // 使用 h 來傳遞 props 進入元件，也可以不使用 h 直接傳入元件
  PDF.value = new VuePdfPrinter(
    h(Com, { title: 'some title' }),
    {
      title: 'file title',
    },
  )

  // 打開打印視窗
  printer.value.print()
})
</script>
```

## 📄 License

[MIT](./LICENSE) License © 2024-PRESENT [Ilya Liao](https://github.com/ilyaliao)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/vue-pdf-printer?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/vue-pdf-printer
[npm-downloads-src]: https://img.shields.io/npm/dm/vue-pdf-printer?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/vue-pdf-printer
[bundle-src]: https://img.shields.io/bundlephobia/minzip/vue-pdf-printer?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=vue-pdf-printer
[license-src]: https://img.shields.io/github/license/ilyaliao/vue-pdf-printer.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/ilyaliao/vue-pdf-printer/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/vue-pdf-printer
