
<template>
  <div class="w-full mt-2" 
       v-motion
       :initial="{ opacity: 0, y: 20 }"
       :enter="{ opacity: 1, y: 0 }"
       :transition="{ duration: 400 }">
    <div class="flex justify-between items-center mb-2">
      <label for="code-editor" class="text-sm font-medium text-foreground">
        {{ label }}
      </label>
      <span class="text-xs text-muted-foreground">
        Vue Component
      </span>
    </div>
    
    <div :class="`
      code-area transition-all duration-200
      ${isFocused ? 'ring-2 ring-primary/20 border-primary/30' : ''}
    `">
      <textarea
        id="code-editor"
        ref="textareaRef"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @keydown="handleKeyDown"
        :placeholder="placeholder"
        class="w-full bg-transparent resize-none outline-none min-h-[200px] font-mono text-sm"
        spellcheck="false">
      </textarea>
    </div>
    
    <div class="flex justify-between items-center mt-2">
      <div class="flex items-center space-x-2">
        <div :class="`h-2 w-2 rounded-full ${modelValue.length > 0 ? 'bg-green-500' : 'bg-muted'}`"></div>
        <span class="text-xs text-muted-foreground">
          {{ modelValue.length }} characters
        </span>
      </div>
      
      <div class="text-xs text-muted-foreground">
        Vue 3
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useMotion } from '@vueuse/motion';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '<!-- Enter your Vue component code here -->'
  },
  label: {
    type: String,
    default: 'Code Editor'
  }
});

const emit = defineEmits(['update:modelValue']);

const textareaRef = ref(null);
const isFocused = ref(false);

// Auto-resize textarea
watch(() => props.modelValue, () => {
  nextTick(() => {
    const textarea = textareaRef.value;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  });
}, { immediate: true });

onMounted(() => {
  const textarea = textareaRef.value;
  if (textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
});

const handleKeyDown = (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;
    
    const newValue = props.modelValue.substring(0, start) + '  ' + props.modelValue.substring(end);
    emit('update:modelValue', newValue);
    
    // Set cursor position after the inserted tab
    nextTick(() => {
      if (textareaRef.value) {
        textareaRef.value.selectionStart = textareaRef.value.selectionEnd = start + 2;
      }
    });
  }
};
</script>
