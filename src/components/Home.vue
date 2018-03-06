<template>
  <v-container>
    <v-layout row wrap>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          :width="2"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel hide-delimiters style="cursor: pointer;">
          <v-carousel-item
            v-for="concert in concerts"
            :src="concert.imageUrl"
            :key="concert.id"
            @click="onLoadConcert(concert.id)">
            <div class="title">
              {{ concert.title }}
            </div>
            <div class="enconcertle">
              En concert le {{ concert.date | date }} au {{ concert.location }}
            </div>

          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap  class="mt-2">
      <v-flex xs12 class="text-xs-center">
       <p>TEXT</p>
      </v-flex>
    </v-layout>
      <v-flex xs12 class="text-xs-center text-sm-right">
        <v-btn large router to="/concerts" class="info">Explore Concerts</v-btn>
      </v-flex>
  </v-container>
</template>

<script>
  export default {
    computed: {
      concerts () {
        return this.$store.getters.featuredConcerts
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadConcert (id) {
        this.$router.push('/concerts/' + id)
      }
    }
  }
</script>

<style scoped>
</style>
