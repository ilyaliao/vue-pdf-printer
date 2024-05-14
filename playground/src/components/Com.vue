<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <section w100vw h100dvh font-sans grid="~ place-content-center" p="x-4 y-10" text="center gray-700 dark:gray-200">
    <p mb10 text-indigo text-3xl>
      {{ title }}
    </p>

    <p fixed top-0>
      fixed on top0
    </p>
    <p fixed bottom-0>
      fixed on bottom0
    </p>
  </section>
</template>
