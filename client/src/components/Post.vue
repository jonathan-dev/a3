<template>
  <div class="post">
    <h1>{{ post.title }}</h1>
    <h2>{{post.date}}</h2>
    <img  src="../assets/logo.png" />
    <!-- <pulse-loader v-else :loading="loading" :color="color" :size="size"></pulse-loader> -->
    <ol v-if="post.tags.length">
      <li v-for="tag in post.tags" v-bind:key="tag.id">
        {{tag.name}}
      </li>
    </ol>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'post',
  props: ['post'],
  data: () => ({}),
  created () {},
  methods: {
    createMovie () {
      console.log('createMovie')
    }
  },
  components: {
    PulseLoader
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
  display: inline-block;
  margin: 0 10px

a
  color: #42b983

.post
  background:#e8e8e8

</style>
