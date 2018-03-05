<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          :width="2"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-media
            :src="concert.imageUrl"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <v-card-actions>
              <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-concert-details-dialog
                :concert="concert">
              </app-edit-concert-details-dialog>
              </template>
            </v-card-actions>
            <h1 class="text-xs-center">{{ concert.title }}</h1>
            <div class="text-xs-center">{{ concert.date | date }} - {{ concert.location }}</div>
            <div>
            </br>
              <app-edit-concert-date-dialog
                :concert="concert" v-if="userIsCreator">
              </app-edit-concert-date-dialog>
              <app-edit-concert-time-dialog
                :concert="concert" v-if="userIsCreator">
              </app-edit-concert-time-dialog>
            </div>
            <div class="description">{{ concert.description }}</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      concert () {
        return this.$store.getters.loadedConcert(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.concert.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style>
.card {
  border-radius: 14px;
  box-shadow: 0 7px 20px rgba(0,0,0,0.05);
  font-family: arvo;
}
.description {
  padding: 5% !important;
  line-height: 2;
  font-size: 14px;
}
</style>
