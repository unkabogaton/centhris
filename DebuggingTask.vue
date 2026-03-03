<!-- Issues encountered -->
<!-- 1. If using fetch, it should be res.json() instead of res.data -->
<!-- 2. No response status check -->
<!-- 3. No error handling -->
<!-- 4. No debounce in search may promote race condition and expensive api fetching -->

<!-- Improvements -->
<!-- 1. Make variable naming emp clear -->
<!-- 2. Added loading and error handling -->
<!-- 3. Added debounce for search (searchInput should be bind to the input component) -->
<!-- 4. Convert search value to url form (in axios, this is handled automaticaly) -->

<template>
  <div v-if="loading">Loading...</div>

  <div v-if="error">
    {{ error }}
  </div>

  <div v-else v-for="employee in employees" :key="employee.id">
    {{ employee.full_name }}
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const searchInput = ref("");
const search = ref("");
const employees = ref([]);

const loading = ref(false);
const error = ref(null);

let timeout;

watch(searchInput, (value) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    search.value = value;
  }, 400);
});

watch(search, async (value) => {
  try {
    loading.value = true;
    error.value = null;

    const res = await fetch(
      `/api/employees?search=${encodeURIComponent(value)}`,
    );

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }

    const data = await res.json();

    employees.value = data;
  } catch (err) {
    error.value = err.message;
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>
