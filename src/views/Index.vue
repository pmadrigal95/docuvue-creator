
<template>
  <div class="flex flex-col min-h-screen bg-background text-foreground">
    <Header />
    
    <main class="flex-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" 
           v-motion
           :initial="{ opacity: 0 }"
           :enter="{ opacity: 1 }"
           :transition="{ duration: 400 }">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div v-motion
               :initial="{ opacity: 0, y: 20 }"
               :enter="{ opacity: 1, y: 0 }"
               :transition="{ duration: 500 }"
               class="inline-block">
            <span class="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">
              Vue 3 Documentation Generator
            </span>
          </div>
          
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4" 
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0 }"
              :transition="{ duration: 500, delay: 100 }">
            Generate beautiful docs for your Vue components
          </h1>
          
          <p class="text-lg text-muted-foreground" 
             v-motion
             :initial="{ opacity: 0, y: 20 }"
             :enter="{ opacity: 1, y: 0 }"
             :transition="{ duration: 500, delay: 200 }">
            Turn your Vue 3 components into well-structured documentation with just a few clicks. Perfect for teams and open-source projects.
          </p>
        </div>
      
        <CreateDocumentation />
      </div>
    </main>
    
    <footer class="w-full py-6 px-4 border-t border-border mt-auto"
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1 }"
            :transition="{ duration: 400, delay: 500 }">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm text-muted-foreground">
          © 2023 DocuVue. All rights reserved.
        </p>
        
        <div class="flex items-center space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </a>
          <a href="#" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import CreateDocumentation from '@/components/CreateDocumentation.vue';
import { useMotion } from '@vueuse/motion';
</script>
