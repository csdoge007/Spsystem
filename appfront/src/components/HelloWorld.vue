<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- show books list -->
    <ul>
      <li v-for="(book, index) in books" :key="index" style="display:block">
        {{ index }}-{{ book.name }}-{{ book.author }}
      </li>
    </ul>
    <!-- form to add a book -->
    <form action="">
      输入书名：<input type="text" placeholder="book name" v-model="inputBook.name"><br>
      输入作者：<input type="text" placeholder="book author" v-model="inputBook.author"><br>
    </form>
    <button type="submit" @click="bookSubmit()">submit</button>
  </div>
</template>

<script setup>  
import { ref } from 'vue';              
import { getBooks, postBook } from '../api/api.js';
const msg = 'Welcome to Your Vue.js App';
const books = ref([
  { name: 'test', author: 't' },
  { name: 'test2', author: 't2' }
]);
const inputBook = ref({
  "name": "",
  "author": "",
})
const loadBooks = () => {
  getBooks().then(response => {
    books.value = response.data
    console.log(books.value);
    
  })
}; // load books list when visit the page
const bookSubmit = () => {
  postBook(inputBook.value.name, inputBook.value.author).then(response => {
    console.log(response)
    loadBooks();
  })
};
loadBooks();
</script>


<style scoped></style>
