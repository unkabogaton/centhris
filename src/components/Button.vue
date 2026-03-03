<script setup lang="ts">
import { computed } from "vue";

interface Props {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "outline";
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "button",
  variant: "primary",
  loading: false,
  disabled: false,
});

const isDisabled = computed(() => props.disabled || props.loading);
</script>

<template>
  <button
    :type="type"
    :disabled="isDisabled"
    :class="['base-button', variant, { loading: loading }]"
  >
    <span v-if="loading" class="spinner"></span>
    <span :class="{ invisible: loading }">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.base-button {
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s ease;
}

.primary {
  background: #2563eb;
  color: white;
}

.primary:hover {
  background: #1e4ed8;
}

.secondary {
  background: #f3f4f6;
  color: #111;
}

.secondary:hover {
  background: #e5e7eb;
}

.danger {
  background: #dc2626;
  color: white;
}

.danger:hover {
  background: #b91c1c;
}

.outline {
  background: transparent;
  border: 1px solid #ccc;
}

.outline:hover {
  background: #f9f9f9;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.invisible {
  visibility: hidden;
}
</style>
