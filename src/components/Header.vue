
<template>
  <header 
    class="w-full py-6 px-6 md:px-8 flex items-center justify-between border-b border-border"
    v-motion
    :initial="{ opacity: 0, y: -10 }"
    :enter="{ opacity: 1, y: 0 }"
    :transition="{ duration: 400 }">
    
    <div class="flex items-center space-x-2">
      <div class="h-8 w-8 rounded-full bg-primary cursor-pointer"
           v-motion
           :initial="{ scale: 1 }"
           :hover="{ scale: 1.05 }"
           :tap="{ scale: 0.95 }">
      </div>
      <h1 class="text-xl font-medium tracking-tight"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1 }"
          :transition="{ delay: 100, duration: 300 }">
        DocuVue
      </h1>
    </div>
    
    <div class="hidden md:flex items-center space-x-6"
         v-motion
         :initial="{ opacity: 0 }"
         :enter="{ opacity: 1 }"
         :transition="{ delay: 200, duration: 300 }">
      <a href="#" class="text-sm text-foreground/80 hover:text-foreground transition-colors">
        Documentation
      </a>
      <a href="#" class="text-sm text-foreground/80 hover:text-foreground transition-colors">
        Examples
      </a>
      <a href="#" class="text-sm text-foreground/80 hover:text-foreground transition-colors">
        GitHub
      </a>
    </div>
  </header>
</template>

<script setup>
import { useMotion } from '@vueuse/motion';
</script>
