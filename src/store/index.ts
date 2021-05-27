import gql from "graphql-tag";
import { createStore } from "vuex"; 

import {
  ApolloLink,
  InMemoryCache,
  from,
  HttpLink,
} from "@apollo/client/core";

import { ApolloClient } from "apollo-client";

import { ApolloClients } from "@vue/apollo-composable";

const token = 'fnAEJ9AMJ5ACBELHHk176GOJjGY_sNHXf_Koi1Zw';

const additiveLink = from([
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    }));
    return forward(operation); // Go to the next link in the chain. Similar to `next` in Express.js middleware.
  }),
  new HttpLink({ uri: "https://graphql.fauna.com/graphql" }),
]);

const graphqlClient = new ApolloClient({
  link: additiveLink,
  cache: new InMemoryCache(),
});


const store = createStore({

mutations: {
  // setBook(state, book) {
  //   state.book = book;
  // },
  setBookList(state, bookList) {
    state.bookList = bookList;
  },
},

state: {
  book: null,
  bookList: [],
},

actions: {
  async fetchBook({ commit }, id) {
    const response = await graphqlClient.query({
      // It is important to not use the
      // ES6 template syntax for variables
      // directly inside the `gql` query,
      // because this would make it impossible
      // for Babel to optimize the code.
      query: gql`
        allTodos {
          data {
            _id
            title
            completed
          }
        }
      `,
      variables: { bookId: id },
    });

    // Trigger the `setBook` mutation
    // which is defined above.
    console.log(response);
    // commit("setBook", response);
  },
  async fetchBookList({ commit }) {
    const response = await graphqlClient.query({
      query: gql`
        query FindAllTodos {
          allTodos {
            data {
              _id
              title
              completed
            }
          }
        }
      `,
    });

    // Trigger the `setBookList` mutation
    // which is defined above.
    console.log(response)
    commit("setBookList", response.data.allTodos.data);
  },
}
})

export default store