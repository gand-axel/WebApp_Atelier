<template>
    <div>
        <NavBar />
        <b-container>
            <h1 class="text-center mt-5">Création de la partie</h1>

            <b-alert class="w-50 mx-auto" v-model="showDismissibleAlert" variant="danger" dismissible>Une erreur s'est produite...</b-alert>
            <b-alert v-model="alert" class="w-50 mx-auto" variant="danger" dismissible>Veuillez choisir une ville</b-alert>

            <b-form class="mt-5 w-50 mx-auto" @submit="submit">
                <b-form-group label="Choisissez une ville :">
                    <b-form-select v-model="ville" :options="tabSerieVille" required />
                </b-form-group>

                <b-form-group label="Choisissez le nombre de photos à trouver :">
                    <b-form-radio-group v-model="nbPhotos" :options="options" name="radio-inline" />
                </b-form-group>

                <div class="text-center mt-5">
                    <div v-if="spinner">
                        <b-spinner variant="primary" label="Spinning"></b-spinner>
                    </div>
                    <div v-else>
                        <b-button pill class="mr-3" type="button" variant="success" @click="createPartie">Créer la partie</b-button>
                        <b-button pill type="submit" variant="success">Jouer</b-button>
                    </div>
                </div>
            </b-form>
        </b-container>
    </div>
</template>

<script>
import axios from "axios";
import NavBar from "./NavBar";

export default {
    name: 'CreationPartie',
    components: {
        NavBar
    },
    data () {
        return {
            url:"http://docketu.iutnc.univ-lorraine.fr:60280/",
            ville: null,
            series: [],
            tabSerieVille: [],
            idSerie: null,
            latitude: null,
            longitude: null,
            dist: 0,
            zoom: 0,
            nbPhotos: 5,
            options: [
                { text:"5", value: 5 },
                { text:"10", value: 10 },
                { text:"15", value: 15 }
            ],
            showDismissibleAlert: false,
            dataJeu: [],
            difference: 0,
            numAlea: 0,
            alert: false,
            spinner: false
        }
    },
    methods: {
        submit(evt) {
            evt.preventDefault()
            this.spinner = true;
            
            this.series.forEach(serie => {
                if(this.ville === serie.ville) {
                    this.idSerie = serie.id;
                    this.latitude = serie.latitude;
                    this.longitude = serie.longitude;
                    this.dist = serie.dist;
                    this.zoom = serie.zoom;
                }
            });

            axios.post(this.url + "parties", {
                nb_photos: this.nbPhotos,
                statut: "Créée",
                refJoueur: this.$route.params.props.dataUser.id,
                refSerie: this.idSerie
            },
            {
                headers: { 
                    "Authorization": "Bearer " + this.$route.params.props.dataUser.token
                }
            })
            .then(response => {
                this.jeu(response.data.id);
            })
            .catch(error => {
                this.showDismissibleAlert = true;
            });
        },
        createPartie() {
            if(this.ville !== null){
                this.spinner = true;
                this.series.forEach(serie => {
                    if(this.ville === serie.ville) {
                        this.idSerie = serie.id;
                    }
                });

                axios.post(this.url + "parties", {
                    nb_photos: this.nbPhotos,
                    statut: "Créée",
                    refJoueur: this.$route.params.props.dataUser.id,
                    refSerie: this.idSerie
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
                    this.showDismissibleAlert = true;
                });
            }
            else {
                this.alert = true;
            }
        },
        jeu(id) {
            axios.get(this.url + "series/" + this.idSerie + "/photos", {
                headers: { 
                    "Authorization": "Bearer " + this.$route.params.props.dataUser.token
                }
            })
            .then(response => {
                response.data.photos.forEach(photo => {
                    this.dataJeu.push(photo.photo);
                });
                
                this.difference = this.dataJeu.length - this.nbPhotos;
                if(this.difference > 0) {
                    for(let i=0; i<this.difference; i++){
                        this.numAlea = Math.floor(Math.random()*(this.dataJeu.length-1));
                        this.dataJeu.splice(this.numAlea, 1);
                    }
                }

                this.$router.push({ name: 'Jeu', params: { props: { 
                    dataUser: this.$route.params.props.dataUser, 
                    photos: this.dataJeu,
                    latitude: this.latitude,
                    longitude: this.longitude,
                    dist: this.dist,
                    zoom: this.zoom,
                    idPartie: id
                }}});
            })
            .catch(error => {
                console.error(error);
            });
        }
    },
    watch: {
        series: function() {
            this.series.forEach(serie => {
                this.tabSerieVille.push(serie.ville);
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
                this.series.push({
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
    }
}
</script>