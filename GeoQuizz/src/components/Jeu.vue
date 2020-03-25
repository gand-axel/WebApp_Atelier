<template>
  <div>
    <h2 class="mx-auto">Trouvez l'emplacement du lieu correspondant à l'image sur la carte</h2>
    <b-button v-if="photos.length == (index+1)">Valider</b-button>
    <b-button v-else @click="nextPhoto">Suivant</b-button>
    <b-img v-bind:src="photos[index].url"></b-img>
    <GmapMap
      id="my-map"
      class="mx-auto mt-3"
      :center="center"
      :zoom="$route.params.props.zoom"
      :options="{fullscreenControl:false, streetViewControl: false}"
      style="width: 1000px; height: 500px"
    >
      <GmapMarker :position="center" :clickable="true" :draggable="true" @dragend="updateCoordinates" />
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  name: "Jeu",
  data() {
    return {
      center: null,
      photos: this.$route.params.props.photos,
      index: 0,
      posPhoto: null,
      path: [],
      distance: 0,
      dist: this.$route.params.props.dist,
      score: 0
    };
  },
  methods: {
    nextPhoto() {
      this.distance = this.google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.path[0].lat, this.path[0].lng), new google.maps.LatLng(this.path[1].lat, this.path[1].lng));

      if(this.distance <= this.dist) {
        this.score += 5;
      } else if(this.distance > this.dist && this.distance <= this.dist*2) {
        this.score += 3;
      } else if(this.distance > this.dist*2 && this.distance <= this.dist*3) {
        this.score += 1;
      } else this.score += 0;

      console.log(this.score);
      this.index += 1;
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