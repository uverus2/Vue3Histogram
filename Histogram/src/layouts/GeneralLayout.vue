<script setup>
  import TheHeader from "@/components/TheHeader.vue";
</script>

<main class="container-fluid">
<TheHeader />
<section class="p-6">
  <slot/>
</section>
</main>