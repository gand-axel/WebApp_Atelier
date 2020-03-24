<template>
  <div>
    <pre>{{ $route.params.props }}</pre>
    <b-button v-if="$route.params.props.photos.length == (index+1)">Valider</b-button>
    <b-button v-else @click="nextPhoto">Suivant</b-button>
    <b-img v-bind:src="$route.params.props.photos[index].url"></b-img>
    <GmapMap class="mx-auto mt-3" :center="center" :zoom="zoom" style="width: 1000px; height: 500px">
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "Jeu",
  data() {
    return {
        center : {},
        markers:[],
        index: 0,
        zoom:0
    };
  },
  created: function() {
      this.center = { lat: this.$route.params.props.latitude, lng: this.$route.params.props.longitude}
      this.zoom = this.$route.params.props.zoom
  },
  methods: {
      nextPhoto() {
          this.index += 1;
      }
  }
};
</script>