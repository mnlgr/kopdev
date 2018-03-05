<template>
  <v-container xs12 sm6 offset-sm3>
    <v-layout row wrap v-for="concert in concerts" :key="concert.id" class="mb-2">
      <v-flex xs12>
        <h2>{{ concert.day }}</h2>
        <v-card
        :href="concert.link"
        target='_blank'>
        <v-card-media
          :src="concert.imageUrl"
          height="600px"
          weight="600px"
          >
          <div class="holder"></div>
                <v-container>
                <h1 class="text-lg-bottom">{{ concert.title }}</h1>
                <div class="subtitle">&nbsp;{{ concert.location }} - {{ concert.hour }} - {{ concert.prix }}
                <br>&nbsp;Si tu apprécies : {{ concert.similar }}</h5></div>
              </v-container>
              <v-flex>
                <div class="vertical">&nbsp;&nbsp;{{ concert.divers }}</div>
              </v-flex>
          </v-card-media>
        </v-card>

      </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
export default {
  computed: {
    concerts () {
      return this.$store.getters.loadedConcerts
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
.card {
  border-radius: 16px;
  box-shadow: 0 7px 20px rgba(10,10,10,0.14);
  font-family: arvo;
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

/* Media Queries */

/* ----------- iPhone 4, 5 and 5S ----------- */

/* Portrait */

@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  h1 {
  font-size: 4em;
  line-height: 1em;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -o-hyphens: auto;
  hyphens: auto;
    }
  h2 {
  font-size: 2em;
  }
  .subtitle{
  font-size: 1.4em;
  }
  .vertical{
  font-size: 1.4em;
  }
  .toolbar__title {
  font-size: 1em;
  font-weight: 900;
  letter-spacing: .06em;
}
}
</style>
