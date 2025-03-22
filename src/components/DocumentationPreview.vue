
<template>
  <div v-if="!componentCode && !description && !isLoading" 
       class="w-full h-[500px] rounded-lg border border-dashed border-border flex flex-col items-center justify-center p-8 text-center"
       v-motion
       :initial="{ opacity: 0 }"
       :enter="{ opacity: 1 }"
       :transition="{ duration: 400 }">
    <div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8V16M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <h3 class="text-lg font-medium mb-1">No Documentation Yet</h3>
    <p class="text-sm text-muted-foreground max-w-md">
      Enter your Vue component code and a description, then click "Generate Documentation" to create the documentation.
    </p>
  </div>
  
  <div v-else
       class="w-full border border-border rounded-lg overflow-hidden bg-card"
       v-motion
       :initial="{ opacity: 0, y: 20 }"
       :enter="{ opacity: 1, y: 0 }"
       :transition="{ duration: 400 }">
    <div class="border-b border-border p-4 bg-muted/30">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-medium">{{ componentName }}</h2>
        <span class="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
          Vue 3
        </span>
      </div>
    </div>
    
    <div class="p-8 flex flex-col items-center justify-center h-[400px]" v-if="isLoading">
      <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p class="text-sm text-muted-foreground">Generating documentation...</p>
    </div>
    
    <div v-else class="p-6">
      <section class="mb-6">
        <h3 class="text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Description
        </h3>
        <p class="text-sm leading-relaxed">
          {{ description || "No description provided." }}
        </p>
      </section>
      
      <section class="mb-6">
        <h3 class="text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Props
        </h3>
        <div v-if="props.length > 0" class="grid gap-2">
          <div v-for="(prop, i) in props" :key="prop"
               class="p-3 bg-muted/50 rounded-md"
               v-motion
               :initial="{ opacity: 0, y: 10 }"
               :enter="{ opacity: 1, y: 0 }"
               :transition="{ delay: i * 50 }">
            <div class="flex items-center justify-between">
              <span class="font-medium text-sm">{{ prop }}</span>
              <span class="text-xs text-muted-foreground px-2 py-0.5 bg-background rounded-full">
                Prop
              </span>
            </div>
          </div>
        </div>
        <div v-else class="text-sm text-muted-foreground italic">
          No props defined.
        </div>
      </section>
      
      <section class="mb-6">
        <h3 class="text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Events
        </h3>
        <div v-if="emits.length > 0" class="grid gap-2">
          <div v-for="(emit, i) in emits" :key="emit"
               class="p-3 bg-muted/50 rounded-md"
               v-motion
               :initial="{ opacity: 0, y: 10 }"
               :enter="{ opacity: 1, y: 0 }"
               :transition="{ delay: i * 50 }">
            <div class="flex items-center justify-between">
              <span class="font-medium text-sm">{{ emit }}</span>
              <span class="text-xs text-muted-foreground px-2 py-0.5 bg-background rounded-full">
                Event
              </span>
            </div>
          </div>
        </div>
        <div v-else class="text-sm text-muted-foreground italic">
          No events defined.
        </div>
      </section>
      
      <section>
        <h3 class="text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Usage Example
        </h3>
        <pre class="p-4 bg-muted/50 rounded-md overflow-x-auto text-xs font-mono">
          <code>{{usageExample}}</code>
        </pre>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useMotion } from '@vueuse/motion';

const props = defineProps({
  componentCode: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const componentName = ref('MyComponent');
const componentProps = ref([]);
const emits = ref([]);

watch(() => props.componentCode, (newCode) => {
  if (newCode) {
    // Extract component name
    const nameMatch = newCode.match(/name:\s*['"](.+?)['"]/);
    componentName.value = nameMatch ? nameMatch[1] : 'MyComponent';
    
    // Extract props
    const propsMatch = newCode.match(/props:\s*{([^}]+)}/s);
    if (propsMatch) {
      const propsStr = propsMatch[1];
      componentProps.value = propsStr.split(',')
        .map(p => p.trim())
        .filter(p => p.length > 0)
        .map(p => {
          const nameMatch = p.match(/(\w+):/);
          return nameMatch ? nameMatch[1] : p;
        });
    } else {
      componentProps.value = [];
    }
    
    // Extract emits
    const emitsMatch = newCode.match(/emits:\s*\[([^\]]+)\]/s);
    if (emitsMatch) {
      const emitsStr = emitsMatch[1];
      emits.value = emitsStr.split(',')
        .map(e => e.trim().replace(/['"]/g, ''))
        .filter(e => e.length > 0);
    } else {
      emits.value = [];
    }
  }
}, { immediate: true });

const usageExample = computed(() => {
  let propsStr = '';
  if (componentProps.value.length > 0) {
    propsStr = `\n  ${componentProps.value.map(p => `:${p}="${p}"`).join('\n  ')}`;
  }
  
  let emitsStr = '';
  if (emits.value.length > 0) {
    emitsStr = `\n  ${emits.value.map(e => `@${e}="handle${e.charAt(0).toUpperCase() + e.slice(1)}"`).join('\n  ')}`;
  }
  
  return `<template>
  <${componentName.value}${propsStr}${emitsStr}
  />
</template>`;
});
</script>
