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
    @import url('https://fonts.googleapis.com/css?family=Didact+Gothic');
    @import url('https://fonts.googleapis.com/css?family=Didact+Gothic|Lato');
    @font-face {
        font-family: Futura_LT;
        src: url(Futura_LT_Condensed_Bold.ttf);
    }

    body{
      font-family: lato;
    }

    .toolbar__title {
        margin-top: 5% !important;
        font-size: 4em;
        font-weight: 900;
        letter-spacing: .06em;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4em;
        font-weight: 900;
        letter-spacing: .06em;
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

    .card {
      border-radius: 16px !important;
      box-shadow: 0 7px 20px rgba(10,10,10,0.14) !important;
      line-height: 2;
      opacity: 1;
      }
    .card:hover{
        -moz-transform: scale(1.02);
        -webkit-transform: scale(1.02);
        -o-transform: scale(1.02);
        transform: scale(1.02);
        -ms-transform: scale(1.2);
        -webkit-transition: all .3s ease-out;
        -moz-transition: all .3s ease-out;
        -o-transition: all .3s ease-out;
        transition: all .3s ease-out;
      -webkit-backface-visibility: hidden;
      -webkit-perspective: 1000;
          }
    .card-media {
      opacity: 0.1;
    }
    .font {
      padding: 0.1;
    }
    h1 {
      font-size:7em;
      font-family: 'Futura_LT', sans-serif;
      font-weight: bold;
      line-height: 100px;
      text-transform: uppercase;
    }
    h2 {
      font-size: 4em;
      font-family: 'Futura_LT', sans-serif;
      padding-top: 0.6em;
    }
    .theme--light .card {
        background-color: #fff;
        color: #ffffff;
      }
    .subtitle{
        font-size: 1.8em;
        font-family: 'Futura_LT', sans-serif;
        line-height: 1.2em;
        position: absolute;
        bottom: 1.2em;
        width: auto;
        z-index: 1;
    }
    .container{
        z-index: 1;
    }
    .holder{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQYV2NkYGD4z8DAwMjIAAUADikBA/gvnngAAAAASUVORK5CYII=);
    pointer-events: none;
    opacity: .5;
    transition: all 600ms ease;
    }
    .vertical{
      font-family: 'Futura_LT', sans-serif;
      font-size: 2em;
      writing-mode: vertical-lr;
      position: absolute;
      top: 0.6em;
      right: 0.2em;
      width: auto;
      z-index: 1;
    }
    .theme--light .card {
        color: #fff;
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
