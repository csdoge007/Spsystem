import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useLoginStore = defineStore('login', () => {
  const currentPage = ref(0);
  const setCurrentPage = (page) => {
    currentPage.value = page;
  }
  return { currentPage, setCurrentPage }
});