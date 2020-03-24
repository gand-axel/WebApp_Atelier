<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand><router-link class="text-white text-decoration-none" :to="{ name: 'Accueil', params: { props: { dataUser: this.$route.params.props.dataUser } } }">GeoQuizz</router-link></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item><router-link class="text-white text-decoration-none" :to="{ name: 'CreationPartie', params: { props: { dataUser: this.$route.params.props.dataUser } } }">Créer une partie</router-link></b-nav-item>
                    <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
                </b-navbar-nav>
            </b-collapse>

            <b-button right variant="danger"><router-link class="text-white text-decoration-none" :to="{ name: 'Connexion' }">Déconnexion</router-link></b-button>
        </b-navbar>

        <b-container>
            <h1 class="text-center mt-5">Création de la partie</h1>

            <b-alert class="w-50 mx-auto" v-model="showDismissibleAlert" variant="danger" dismissible>Une erreur s'est produite...</b-alert>

            <b-form class="mt-5 w-50 mx-auto" @submit="submit">
                <b-form-group label="Choisissez une ville :">
                    <b-form-select v-model="ville" :options="tabSerieVille" required />
                </b-form-group>

                <b-form-group label="Choisissez le nombre de photos à trouver :">
                    <b-form-radio-group v-model="nbPhotos" :options="options" name="radio-inline" />
                </b-form-group>

                <div class="text-center mt-5">
                    <b-button pill type="submit" variant="success">Jouer</b-button>
                </div>
            </b-form>
        </b-container>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'CreationPartie',
    data () {
        return {
            url: "https://7a4b884a.ngrok.io/",
            ville: null,
            series: [],
            tabSerieVille: [],
            idSerie: null,
            nbPhotos: 5,
            options: [
                { text:"5", value: 5 },
                { text:"10", value: 10 },
                { text:"15", value: 15 }
            ],
            showDismissibleAlert: false,
            dataJeu: [],
            difference: 0,
            numAlea: 0
        }
    },
    methods: {
        submit(evt) {
            evt.preventDefault()
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
                this.jeu();
            })
            .catch(error => {
                this.showDismissibleAlert = true;
            });
        },
        jeu() {
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
                for(let i=0; i<this.difference; i++){
                    this.numAlea = Math.floor(Math.random()*(this.dataJeu.length-1));
                    this.dataJeu.splice(this.numAlea, 1);
                }

                this.$router.push({ name: 'Jeu', params: { props: { 
                    dataUser: this.$route.params.props.dataUser, 
                    photos: this.dataJeu
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
                    ville: serie.serie.ville
                });
            });
        })
        .catch(error => {
            console.error(error);
        });
    }
}
</script>

<style scoped>

</style>
