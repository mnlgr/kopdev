<template>
  <v-app>
    <v-navigation-drawer
      persistent
      enable-resize-watcher
      fixed
      app
      temporary v-model="sideNav">
          <v-list>
            <v-list-tile
              v-for="item in menuItems"
              :key="item.tile"
              :to="item.link">
              <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userIsAuthentificated"
          @click="onLogout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Se déconnecter</v-list-tile-content>
          </v-list-tile>
        </v-list>
        </v-navigation-drawer>
        <v-toolbar>
          <v-toolbar-side-icon
            @click.stop="sideNav = !sideNav"
            class="hidden-sm-and-up"></v-toolbar-side-icon>
          <v-toolbar-title>
            <router-link to="/" tag="span" style="cursor: pointer">KOPLESH</router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-xs-only">
            <v-btn
              flat
              v-for="item in menuItems"
              :key="item.title"
              :to="item.link">
              <v-icon left dark>{{ item.icon }}</v-icon>
              {{ item.title }}

            </v-btn>
            <v-btn
              v-if="userIsAuthentificated"
              flat
              @click="onLogout">
              <v-icon left dark>exit_to_app</v-icon>
            Se déconnecter

            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <main>
          <router-view></router-view>
        </main>
      </v-app>
    </template>

    <script>
      export default {
        data () {
          return {
            sideNav: false
          }
        },
        computed: {
          menuItems () {
            let menuItems = [
              { icon: 'speaker_group', title: 'Proposer un concert', link: '/signin' }
            ]
            if (this.userIsAuthentificated) {
              menuItems = [
                { icon: 'event', title: 'Agenda', link: '/concerts' },
                { icon: 'speaker', title: 'Ajouter un concert', link: '/concert/new' }
              ]
            }
            return menuItems
          },
          userIsAuthentificated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
          }
        },
        methods: {
          onLogout () {
            this.$store.dispatch('logout')
          }
        }
      }
    </script>

    <style>


    .toolbar__title {
        margin-top: 5% !important;
        font-size: 4em;
        font-weight: 900;
        letter-spacing: .06em;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .toolbar {
    font-family: 'Futura_LT', sans-serif;
    margin-top: 40%;
    margin-bottom: 3em;
    font-size: 2em;
    position: relative;
    background-color: #f5f5f500 !important;
    box-shadow: 0 0px 0px 0px rgba(0,0,0,0) !important;
    font-weight: 900;
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: .02em;
    }

    /* Media Queries */

    /* ----------- iPhone 4, 5 and 5S ----------- */

    /* Portrait */

    @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
      .toolbar {
      font-family: 'Futura_LT', sans-serif;
      margin-top: 40%;
      margin-bottom: 0em;
      font-size: 3.5em;
      }
    }
    </style>
