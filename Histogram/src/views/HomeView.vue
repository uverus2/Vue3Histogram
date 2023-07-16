<script setup>
import {computed, provide, ref, watch, reactive} from 'vue'

//Components
import TheLoader from "@/components/TheLoader.vue";
import TheErrorAlert from "@/components/TheErrorAlert.vue";
import TheHistogram from "@/components/Histogram/TheHistogram.vue";
import TheForm from "@/components/HistogramForm/TheForm.vue";

import GeneralLayout from "@/layouts/GeneralLayout.vue";
import {useIntegerFetch} from "@/composables/useIntegerFetch";


const {response, error, execute, isLoading} = useIntegerFetch(),
      options = reactive({num: 200, max: 12});

execute(options);

function refreshResults() {
  options.max = 12;
  options.min = 1;
  options.num = 200;

  execute(options);
}

const histogramValues = ref({});

watch(response, async (results) => {
  histogramValues.value = results.reduce((accumulator, number) => {
    if (number) {
      accumulator[number] = (accumulator[number] || 0) + 1;
    }

    return accumulator;
  }, {});
});


const isError = ref(false);
watch(error, async (newVal) => {
  if (newVal) {
    isError.value = true;
  }

  if(isError.value){
    setTimeout(() => isError.value = false, 2000);
  }
});


const checkIfResults = computed(() => {
  return Object.keys(histogramValues.value).length;
});

const submitForm = (formData) => {
  const {max, min, num} = formData;

  options.max = max;
  options.min = min;
  options.num = num;

  execute(options);
}

provide('apiOptions', options);

</script>

<template>
  <GeneralLayout>
    <section>
      <div class="flex flex-col  align-middle my-4 sm:justify-between sm:flex-row">
        <h2 class="text-center text-3xl py-5"> Histogram </h2>
        <div class="w-full text-center sm:text-right">
          <button class="rounded-md w-32 h-12 p-3 bg-primary hover:bg-secondary text-white " @click="refreshResults">Refresh</button>
        </div>
      </div>
      <TheLoader v-if="isLoading"/>
      <TheErrorAlert v-if="isError" :error="error"/>
    </section>
    <section>
      <TheHistogram v-if="checkIfResults" :data="histogramValues"/>
    </section>
    <section>
      <div class="container mx-auto my-4 py-4">
        <TheForm @submitForm="submitForm" />
      </div>
    </section>
  </GeneralLayout>
</template>
