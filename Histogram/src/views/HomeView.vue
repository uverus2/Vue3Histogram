<script setup>
  import { watch, ref } from 'vue'

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

  watch(error, async (newVal) => {
    if(newVal){
      console.log('error', newVal);
    }
  })

</script>

<template>
  <GeneralLayout>
    <div>
      <h2>Histogram {{isLoading}}</h2>
    </div>
  </GeneralLayout>
</template>
