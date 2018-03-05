<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Date
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Concert Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editabledate" style="width: 100%" actions>
              <template scope="{save, cancel}">
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click.native="editDialog = false">Close</v-btn>
                <v-btn
                  class="blue--text darken-1"
                  flat
                  @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-date-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['concert'],
    data () {
      return {
        editDialog: false,
        editabledate: null
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.concert.date)
        const newDay = new Date(this.editabledate).getUTCDate()
        const newMonth = new Date(this.editabledate).getUTCMonth()
        const newYear = new Date(this.editabledate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        this.$store.dispatch('updateConcertData', {
          id: this.concert.id,
          date: newDate
        })
      }
    },
    created () {
      this.editableDate = new Date(this.concert.date)
    }
  }
</script>
