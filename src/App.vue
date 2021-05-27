<template>
    <div>
        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
        <div>
            {{ hello }} {{ hellos }} {{ todos }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { gql } from '@apollo/client/core'
import HelloWorld from './components/HelloWorld.vue'
import { mapState } from 'vuex';
import store from "./store/index";

export const GET_MY_TODOS = gql `
query {
  allTodos {
    data {
      _id
      title
      completed
    }
  }
}`;

export default defineComponent({
    name: 'App',
    computed: {
        ...mapState(['book', 'bookList']),
    },
    components: {
        HelloWorld
    },
    beforeCreate() {
        // `1` is the ID of the book we want to fetch.
        // this.$store.dispatch('fetchBook', 1);
        this.$store.dispatch('fetchBookList');
    },
    data() {
        return {
            hello: [],
            hellos: [],
            todos: this.$store.state.bookList
        }
    },
    apollo: {
        hello() {
            return {
                query: gql `query {
          allTodos {
            data {
              _id
              title
              completed
            }
          }
        }`
            }
        },
        hellos: gql `query {
      allTodos {
        data {
          _id
          title
          completed
        }
      }
    }`,
        todos: {
            query: GET_MY_TODOS
        }
    }
})
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
