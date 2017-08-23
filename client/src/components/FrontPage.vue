<template>
  <div class="frontpage">
    <h1>{{ msg }}<span class="add"><router-link v-bind:to="`/movies/new`">+</router-link></span></h1>
    <ol v-if="posts.length">
      <li v-for="post in posts" v-bind:key="post.id">
        <post v-bind:post="post"></post>
      </li>
    </ol>
    <pulse-loader v-else :loading="loading" :color="color" :size="size"></pulse-loader>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Post from './Post'
import gql from 'graphql-tag'

export default {
  name: 'frontpage',
  data: () => ({
    msg: 'Frontpage',
    posts: [],
    loading: true,
    color: '#3AB982',
    size: 10
  }),
  apollo: {
    posts: {
      query: gql`query {
          posts{
            id,
            title,
            date,
            tags{
              id,
              name
            }
          }
        }`,
      loadingKey: 'loading',
      pollInterval: 1000,
      // Optional result hook
      result ({ data, loader, networkStatus }) {
        console.log('We got some result!', data, loader, networkStatus)
      }
    }

  },
  created () {
  },
  methods: {
    createPost () {
      console.log('createPost')
    }
  },
  components: {
    PulseLoader,
    Post
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
h1,h2
  font-weight: normal

ul
  list-style-type: none;
  padding: 0

li
  display: block;
  margin: 0 10px

a
  color: #42b983

.add
  cursor: pointer

</style>
