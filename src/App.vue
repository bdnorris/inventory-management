<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <div>
      {{ hello }}
      {{ hellos }}
      {{ todos }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { gql } from '@apollo/client/core'
import HelloWorld from './components/HelloWorld.vue'

export const GET_MY_TODOS = gql`
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
  components: {
    HelloWorld
  },
  data () {
    return {
      hello: [],
      hellos: [],
      todos: []
    }
  },
  apollo: {
    hello () {
      return {
        query: gql`query {
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
    hellos: gql`query {
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
