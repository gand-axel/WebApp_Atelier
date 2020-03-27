<template>
    <div>
        <NavBar />
        <b-container fluid>
            <h1 class="text-center mt-5">Bienvenue sur GeoQuizz !</h1>

            <div v-if="spinner" class="text-center mt-5">
                <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
            <div v-else class="mt-5">
                <h3>Parties Créées :</h3>
                <b-table v-if="resultat" striped hover :items="parties" :fields="fields">
                    <template v-slot:cell(play)="data">
                        <b-spinner v-if="spin" variant="primary" label="Spinning"></b-spinner>
                        <b-button v-else pill type="button" variant="outline-success" @click="jouer(data.item.id, data.item.idSerie, data.item.nbPhotos)">{{ data.value }}</b-button>
                    </template>
                </b-table>
                <p v-else>Aucunes parties n'a été créées.</p>
            </div>
        </b-container>
    </div>
</template>

<script>
import axios from "axios";
import NavBar from "./NavBar";

export default {
    name: 'Accueil',
    components: {
        NavBar
    },
    data () {
        return {
            url: "https://789a8d57.ngrok.io/",
            parties: [],
            tabSerie: [],
            ville: null,
            fields: [
                { key: 'date', label: 'Créée le :', sortable: true },
                { key: 'ville', label: 'Ville', sortable: false },
                { key: 'nbPhotos', label: 'Nombre de photos', sortable: false },
                { key: 'play', label: '', sortable: false }
            ],
            spinner: true,
            spin: false,
            dataJeu: [],
            difference: 0,
            numAlea: 0,
            latitude: null,
            longitude: null,
            dist: null,
            zoom: null,
            resultat: false
        }
    },
    methods: {
        jouer(idPartie, idSerie, nbPhotos) {
            this.spin = true;

            axios.get(this.url + "series/" + idSerie + "/photos", {
                headers: { 
                    "Authorization": "Bearer " + this.$route.params.props.dataUser.token
                }
            })
            .then(response => {
                response.data.photos.forEach(photo => {
                    this.dataJeu.push(photo.photo);
                });

                this.difference = this.dataJeu.length - nbPhotos;
                if(this.difference > 0) {
                    for(let i=0; i<this.difference; i++){
                        this.numAlea = Math.floor(Math.random()*(this.dataJeu.length-1));
                        this.dataJeu.splice(this.numAlea, 1);
                    }
                }

                this.tabSerie.forEach(serie => {
                    if(serie.id == idSerie){
                        this.latitude = serie.latitude;
                        this.longitude = serie.longitude;
                        this.dist = serie.dist;
                        this.zoom = serie.zoom;
                    }
                });

                this.$router.push({ name: 'Jeu', params: { props: { 
                    dataUser: this.$route.params.props.dataUser, 
                    photos: this.dataJeu,
                    latitude: this.latitude,
                    longitude: this.longitude,
                    dist: this.dist,
                    zoom: this.zoom,
                    idPartie: idPartie
                }}});
            })
            .catch(error => {
                console.error(error);
            });
        }
    },
    created: function() {
        axios.get(this.url + "series", {
            headers: { 
                "Authorization": "Bearer " + this.$route.params.props.dataUser.token
            }
        })
        .then(response => {
            response.data.series.forEach(serie => {
                this.tabSerie.push({
                    id: serie.serie.idSerie,
                    ville: serie.serie.ville,
                    latitude: serie.serie.latitude,
                    longitude: serie.serie.longitude,
                    dist: serie.serie.dist,
                    zoom: serie.serie.zoom
                });
            });
        })
        .catch(error => {
            console.error(error);
        });

        axios.get(this.url + "joueurs/" + this.$route.params.props.dataUser.id + "/partiesCreees", {
            headers: { 
                "Authorization": "Bearer " + this.$route.params.props.dataUser.token
            }
        })
        .then(response => {
            response.data.parties.forEach(partie => {
                this.tabSerie.forEach(res => {
                    if(partie.partie.refSerie == res.id) this.ville = res.ville;
                })
                this.parties.push({
                    id: partie.partie.idPartie,
                    idSerie: partie.partie.refSerie,
                    nbPhotos: partie.partie.nb_photos,
                    ville: this.ville,
                    date: new Date(partie.partie.created_at).toLocaleDateString(),
                    play: "Jouer"
                });
            });
            this.spinner = false;
            this.resultat = true;
        })
        .catch(error => {
            this.spinner = false;
            this.resultat = false;
        });
    }
}
</script>