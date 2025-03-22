
<template>
  <div class="toast-container">
    <TransitionGroup name="toast">
      <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.type">
        <div class="toast-content">
          <div class="toast-title">{{ toast.title }}</div>
          <div class="toast-description" v-if="toast.description">{{ toast.description }}</div>
        </div>
        <button class="toast-close" @click="removeToast(toast.id)">×</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

const toasts = ref([]);
let toastId = 0;

export function useToast() {
  const addToast = (toast) => {
    const id = toastId++;
    toasts.value.push({
      id,
      ...toast,
    });
    
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
    
    return id;
  };
  
  const removeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  };
  
  const success = (toast) => {
    return addToast({
      type: 'success',
      ...toast,
    });
  };
  
  const error = (toast) => {
    return addToast({
      type: 'error',
      ...toast,
    });
  };
  
  const info = (toast) => {
    return addToast({
      type: 'info',
      ...toast,
    });
  };
  
  const warning = (toast) => {
    return addToast({
      type: 'warning',
      ...toast,
    });
  };
  
  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  };
}

export const ToastPlugin = {
  install(app) {
    app.config.globalProperties.$toast = useToast();
  },
};
</script>

<style>
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 350px;
}

.toast {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.375rem;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  animation: slide-in 0.2s ease-out;
}

.toast.success {
  border-left: 4px solid #10b981;
}

.toast.error {
  border-left: 4px solid #ef4444;
}

.toast.info {
  border-left: 4px solid #3b82f6;
}

.toast.warning {
  border-left: 4px solid #f59e0b;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-weight: 500;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.toast-description {
  font-size: 0.75rem;
  color: #6b7280;
}

.toast-close {
  font-size: 1.25rem;
  line-height: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0 0.5rem;
  color: #6b7280;
}

.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@keyframes slide-in {
  from {
    transform: translateX(30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
