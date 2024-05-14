<script setup lang="ts">
import { h, onMounted, shallowRef } from 'vue'

import { VuePdfPrinter } from '../../src/index'
import Com from './components/Com.vue'

const PDF = shallowRef<VuePdfPrinter>()

onMounted(() => {
  PDF.value = new VuePdfPrinter(
    h(Com, { title: 'test pdf' }),
    {
      title: 'test pdf',
    },
  )
})
</script>

<template>
  <main w100vw h100dvh font-sans grid="~ place-content-center" p="x-4 y-10" text="center gray-700 dark:gray-200">
    <template v-if="PDF">
      <div flex="~ justify-center items-center gap2">
        <button class="btn" @click="PDF.preview()">
          preview
        </button>
        <button class="btn" @click="PDF.print()">
          print
        </button>
      </div>
    </template>
  </main>
</template>
