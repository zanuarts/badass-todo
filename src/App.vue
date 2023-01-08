<template>
  <div class="badass-todo">

    <div class="title has-text-centered">
      Badass Todo
    </div>
    
    <form
      @submit.prevent="addTodo"
    >
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input 
            v-model="newTodoContent"
            class="input" 
            type="text" 
            placeholder="Add a todo">
        </p>
        <p class="control">
          <button
            :disabled="!newTodoContent"
            class="button is-info">
            Add
          </button>
        </p>
      </div>
    </form>

    <div 
    v-for="todo in todos"
    class="card mb-5"
    :class="{'has-background-success-light' : todo.done}">
      <div class="card-content">
        <div class="content">

          <div class="columns is-mobile is-vcentered">
            <div 
              :class="{ 'has-text-success line-through' : todo.done }"
              class="column">
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button
                @click="toggleDone(todo.id)"
                :class="todo.done ? 'is-success' : 'is-light'"
                class="button is-light">
                &check;
              </button>
              <button 
                @click="deleteTodo(todo.id)"
                class="button is-danger ml-2">
                &cross;
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
/*
  imports
*/

import { ref, onMounted } from 'vue'
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  updateDoc,
  query,
  orderBy,
  limit
} from 'firebase/firestore'
import { db } from '@/firebase'

// firebase refs

const todosCollectionRef = collection(db, 'todos')
const todosCollectionQuery = query(todosCollectionRef, orderBy('date', 'desc'), limit(2));


// Todos

const todos = ref([])

// get todo

onMounted(() => {
  onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const firestoreTodo = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      }
      firestoreTodo.push(todo)
    })
    todos.value = firestoreTodo
  })
})

// add todo

const newTodoContent = ref('')

const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false,
    date: Date.now()
  })

  newTodoContent.value = ''
}

// delete todo

const deleteTodo = id => {
  deleteDoc(doc(todosCollectionRef, id));
}

// toggle done

const toggleDone = id => {
  const index = todos.value.findIndex(todo => todo.id === id)

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done
  });
}

</script>


<style>
@import 'bulma/css/bulma.min.css';

.badass-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}

</style>