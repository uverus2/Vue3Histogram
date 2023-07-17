<script setup>
import {useForm, useIsSubmitting, useResetForm} from 'vee-validate';
import * as yup from 'yup';

//Components
import InputField from "@/components/HistogramForm/InputField.vue";

const emit = defineEmits(['submitForm']),
    isSubmitting = useIsSubmitting(),
    resetForm = useResetForm();

const {handleSubmit} = useForm({
  validationSchema: yup.object({
    max: yup.number().max(100).required(),
    min: yup.number().min(0).required(),
    num: yup.number().max(5000).required()
  })
});

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