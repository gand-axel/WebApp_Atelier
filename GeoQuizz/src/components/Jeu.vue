<template>
  <div>
    <h2 class="mx-auto">Trouvez l'emplacement du lieu correspondant à l'image sur la carte</h2>
    <b-button v-if="$route.params.props.photos.length == (index+1)">Valider</b-button>
    <b-button v-else @click="nextPhoto">Suivant</b-button>
    <b-img v-bind:src="$route.params.props.photos[index].url"></b-img>
    <GmapMap
      id="my-map"
      class="mx-auto mt-3"
      :center="center"
      :zoom="zoom"
      :options="{disableDoubleClickZoom:true, fullscreenControl:false,streetViewControl: false}"
      style="width: 1000px; height: 500px"
    >
      <GmapMarker :position="center" :clickable="true" :draggable="true" />
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
export default {
  name: "Jeu",
  data() {
    return {
      center: {},
      markers: null,
      index: 0,
      zoom: 10
    };
  },
  created: function() {
    this.center = {
      lat: this.$route.params.props.latitude,
      lng: this.$route.params.props.longitude
    };
    this.zoom = this.$route.params.props.zoom;
  },
  methods: {
    nextPhoto() {
      this.index += 1;
    }
  },
};
</script>