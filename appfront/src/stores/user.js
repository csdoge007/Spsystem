import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUserName } from '@/api/api';
export const useLoginStore = defineStore('login', () => {
  const currentPage = ref(0);
  const username = ref('');
  const isAdmin = ref(true);
  const setCurrentPage = (page) => {
    currentPage.value = page;
  }
  const setUserName = async () => {
    const data = await getUserName();
    username.value = data.data.username;
    //username, ismanager 
    isAdmin.value = data.data.ismanager;
  } 
  return { currentPage, setCurrentPage, username, setUserName, isAdmin }
});