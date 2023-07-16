<script setup>
  import { ref } from 'vue'

  const mappedErrorMessage = ref("");

  const props = defineProps({
    error: {
      type: Object,
      required: true
    },
  });

  switch (props.error.status){
    case 404:
      mappedErrorMessage.value = "The page we are searching could not found.";
      break;
    case 503:
      mappedErrorMessage.value = "The third party API is in maintenance.";
      break;
    case 504:
      mappedErrorMessage.value = "The third party API is busy at this time.";
      break;
    default:
      mappedErrorMessage.value = "Internal problem with the API.";
      break;
  }

</script>
<template>
  <div class="rounded-md p-6 mt-4 text-white text-2xl text-center bg-primary opacity-80">
    <p> {{error.message}}</p>
    <p class="font-bold mt-5">{{mappedErrorMessage}}</p>
  </div>
</template>