<script setup>
import {computed, ref, watch} from 'vue'

//Components
import TheLoader from "@/components/TheLoader.vue";
import TheErrorAlert from "@/components/TheErrorAlert.vue";
import TheHistogram from "@/components/Histogram/TheHistogram.vue";
import TheForm from "@/components/HistogramForm/TheForm.vue";
import TheDivider from "@/components/TheDivider.vue";

import GeneralLayout from "@/layouts/GeneralLayout.vue";
import {useIntegerFetch} from "@/composables/useIntegerFetch";
import { useApiOptions } from "@/stores/apiOptions";


const {response, error, execute, isLoading} = useIntegerFetch();
const {options, populate, populateDefaults } = useApiOptions();

execute(options);

function refreshResults() {
  populateDefaults();
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

  if (isError.value) {
    setTimeout(() => isError.value = false, 2000);
  }
});


const checkIfResults = computed(() => {
  return Object.keys(histogramValues.value).length;
});

const submitForm = (formData) => {
  populate(formData);
  execute(options);
}

</script>

<template>
  <GeneralLayout>
    <section>
      <div class="flex flex-col  align-middle my-4 sm:justify-between sm:flex-row">
        <h2 class="text-center text-3xl py-5"> Histogram </h2>
        <div class="w-full text-center sm:text-right">
          <button class="rounded-md w-32 h-12 p-3 bg-primary hover:bg-secondary text-white " @click="refreshResults">
            Refresh
          </button>
        </div>
      </div>
      <TheLoader v-if="isLoading"/>
      <TheErrorAlert v-if="isError" :error="error"/>
    </section>
    <section>
      <TheHistogram v-if="checkIfResults" :data="histogramValues"/>
    </section>
    <TheDivider />
    <section>
      <div class="container mx-auto my-5 py-4">
        <h2 class="text-primary font-bold text-center mb-3 text-2xl">Change Histogram Values</h2>
        <TheForm @submitForm="submitForm"/>
      </div>
    </section>
  </GeneralLayout>
</template>
