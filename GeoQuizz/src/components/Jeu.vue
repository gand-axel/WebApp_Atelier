<template>
  <div>
    <b-container fluid>
      <div class="d-flex flex-row">
        <div class="w-100" >

          <GmapMap
            id="my-map"
            class="mx-auto mt-3"
            :center="center"
            :zoom="$route.params.props.zoom"
            :options="{fullscreenControl: false, streetViewControl: false, styles: [ { 'featureType': 'poi', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] } ]}"
            style="height: 95vh;"
            fluid
          >
            <GmapMarker :position="center" :clickable="true" :draggable="true" @dragend="updateCoordinates" />
          </GmapMap>

        </div>

        <div class="text-center mt-3 w-90">
          <div class="d-flex flex-column">

            <h3 class="text-center">Déplacer le curseur sur la carte et trouvez l'emplacement du lieu correspondant à l'image</h3>
            <p class="text-center text-muted mb-0">Plus vous êtes précis et rapide, plus vous gagnez de points !</p>
            <p class="text-center text-muted">Faites attention au temps !</p>

            <div>
              <b-img v-bind:src="photos[index].url" v-bind:alt="photos[index].descr" style="height: 50vh;" fluid></b-img>
            </div>

            <div class="mt-3">
              <p v-if="this.time <= 5" class="text-danger"><b-icon-clock-history class="text-primary" /> {{ time }}</p>
              <p v-else><b-icon-clock-history class="text-primary" /> {{ time }}</p>
              <p><b-icon-star-fill class="text-warning"/> {{ score }}</p>
              <div class="mt-3">
                <div v-if="spinner">
                    <b-spinner variant="primary" label="Spinning"></b-spinner>
                </div>
                <div v-else>
                  <b-button pill v-if="photos.length == (index+1)" type="button" variant="success" @click="valider">Valider</b-button>
                  <b-button pill v-else type="button" variant="success" @click="nextPhoto">Suivant</b-button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </b-container>

  </div>
</template>

<script>
import axios from "axios";
import { gmapApi } from "vue2-google-maps";

export default {
  name: "Jeu",
  data() {
    return {
      url: "http://docketu.iutnc.univ-lorraine.fr:60280/",
      center: null,
      photos: this.$route.params.props.photos,
      index: 0,
      posPhoto: null,
      path: [],
      distance: 0,
      dist: this.$route.params.props.dist,
      score: 0,
      time: 20,
      tempsTotal: 0,
      mult: 0,
      spinner: false
    };
  },
  timers: {
    temps: {time:1000, autostart:true, repeat:true}
  },
  methods: {
    temps() {
      this.time -= 1;
      if(this.time == 0) {
        this.$timer.stop('temps');
        if(this.photos.length == (this.index + 1)) this.valider();
        else this.nextPhoto();
      }
    },
    jeu() {
      this.tempsTotal += 20-this.time;
      this.distance = this.google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.path[0].lat, this.path[0].lng), new google.maps.LatLng(this.path[1].lat, this.path[1].lng));

      if(20-this.time <= 5){
        this.mult = 4;
      } else if(20-this.time > 5 && 20-this.time <= 10){
        this.mult = 2;
      } else if(20-this.time > 10 && 20-this.time < 20){
        this.mult = 1;
      } else this.mult = 0;

      if(this.distance === 0) {
        this.score += 100 * this.mult;
      } else if(this.distance <= this.dist) {
        this.score += 5 * this.mult;
      } else if(this.distance > this.dist && this.distance <= this.dist*2) {
        this.score += 3 * this.mult;
      } else if(this.distance > this.dist*2 && this.distance <= this.dist*3) {
        this.score += 1 * this.mult;
      } else this.score += 0;
    },
    nextPhoto() {
      this.$timer.stop('temps');
      this.jeu();
      this.index += 1;
      this.time = 20;
      this.$timer.start('temps');
    },
    valider() {
      this.spinner = true;
      this.$timer.stop('temps');
      this.jeu();

      axios.put(this.url + "parties/" + this.$route.params.props.idPartie, {
        statut: "Terminée",
        score: this.score,
        temps: this.tempsTotal
      },
      {
        headers: { 
          "Authorization": "Bearer " + this.$route.params.props.dataUser.token
        }
      })
      .then(response => {
        this.$router.push({ name: 'Accueil', params: { props: { dataUser: this.$route.params.props.dataUser } } });
      })
      .catch(error => {
        console.error(error);
      });
    },
    updateCoordinates(location) {
      this.center = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      };
    }
  },
  watch: {
    index: function() {
      this.posPhoto = {
        lat: this.photos[this.index].latitude,
        lng: this.photos[this.index].longitude
      }
    },
    center: function() {
      this.path = [
        { lat: this.center.lat, lng: this.center.lng },
        { lat: this.posPhoto.lat, lng: this.posPhoto.lng }
      ]
    },
    posPhoto: function() {
      this.path = [
        { lat: this.center.lat, lng: this.center.lng },
        { lat: this.posPhoto.lat, lng: this.posPhoto.lng }
      ]
    }
  },
  computed: {
    google: gmapApi
  },
  created: function() {
    this.center = {
      lat: this.$route.params.props.latitude,
      lng: this.$route.params.props.longitude
    };

    this.posPhoto = {
      lat: this.photos[this.index].latitude,
      lng: this.photos[this.index].longitude
    }

    this.path = [
      { lat: this.center.lat, lng: this.center.lng },
      { lat: this.posPhoto.lat, lng: this.posPhoto.lng }
    ]
  },
};
</script>