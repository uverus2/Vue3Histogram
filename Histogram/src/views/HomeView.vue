<script setup>
  import { watch, ref } from 'vue'

  //Components
  import TheLoader from "@/components/TheLoader.vue";
  import TheErrorAlert from "@/components/TheErrorAlert.vue";
  import TheHistogram from "@/components/Histogram/TheHistogram.vue";

  import GeneralLayout from "@/layouts/GeneralLayout.vue";
  import {useIntegerFetch} from "@/composables/useIntegerFetch";

  const {response, error, execute, isLoading} = useIntegerFetch();
  execute({});

const histogramValues = ref([]);
 watch(response, async (results) => {
   histogramValues.value = results.reduce((accumulator, number) => {
     if(number){
       accumulator[number] = (accumulator[number] || 0) + 1;
     }

     return accumulator;
   }, {});
 });

 const isError = ref(false);
  watch(error, async (newVal) => {
    if(newVal){
      isError.value = true;
    }
  })

</script>

<template>
  <GeneralLayout>
    <section>
      <h2 class="text-center text-3xl py-5">Histogram </h2>
      <TheLoader v-if="isLoading" />
      <TheErrorAlert v-if="isError" :error="error"/>
    </section>
    <section>
      <TheHistogram :data="histogramValues" />
    </section>
  </GeneralLayout>
</template>
