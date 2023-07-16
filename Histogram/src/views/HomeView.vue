<script setup>
  import { watch } from 'vue'

  import GeneralLayout from "@/layouts/GeneralLayout.vue";
  import {useIntegerFetch} from "@/composables/useIntegerFetch";

  const {response, error, execute, isLoading} = useIntegerFetch();
  execute({});

 watch(response, async (newVal) => {
   console.log("value", newVal)
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
