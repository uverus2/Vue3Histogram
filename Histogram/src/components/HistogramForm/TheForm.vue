<script setup>
//Components
import InputField from "@/components/HistogramForm/InputField.vue";

//Schemas
import histogramSchema from "@/validationSchemas/histogramForm";

import {useForm} from 'vee-validate';
const {handleSubmit, isSubmitting, resetForm} = useForm(histogramSchema);

const emit = defineEmits(['submitForm']);


const submitForm = handleSubmit(values => {
  const {max, min, num} = values,
      formData = {
        max: max || 0,
        min: min || 0,
        num: num || 200
      };

  emit('submitForm', formData);
  resetForm();
});

</script>
<template>
  <form @submit="submitForm">
    <label class="block">
      <span class="block text-sm font-medium text-slate-700">Max Columns</span>

      <InputField name="max" placeholder="0" type="number"/>

    </label>
    <label class="block">
      <span class="block text-sm font-medium text-slate-700">Min Columns</span>

      <InputField name="min" placeholder="0" type="number"/>
    </label>
    <label class="block">
      <span class="block text-sm font-medium text-slate-700">Number of Numbers</span>

      <InputField name="num" placeholder="200" type="number"/>
    </label>
    <div class="w-full text-center mt-3">
      <button :class="{'disabled' : isSubmitting}" :disabled="isSubmitting"
              class="rounded p-3 w-32 h-12 bg-primary text-white hover:bg-secondary" type="submit">
        Click
      </button>
    </div>
  </form>
</template>