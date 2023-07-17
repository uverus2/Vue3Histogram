<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <main class="container-fluid">
    <TheHeader/>
    <section class="p-0 sm:p-3 md:p-6 red">
      <slot/>
    </section>
    <TheFooter/>
  </main>
</template>
