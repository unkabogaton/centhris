<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  modelValue: string;
  placeholder?: string;
  debounce?: number;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Search...",
  debounce: 400,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const input = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    input.value = val;
  },
);

let timeout: ReturnType<typeof setTimeout>;

watch(input, (value) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    emit("update:modelValue", value);
  }, props.debounce);
});
</script>

<template>
  <input v-model="input" :placeholder="placeholder" class="base-search" />
</template>

<style scoped>
.base-search {
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>
