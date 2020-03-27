<template>
    <div>
        <NavBar />
        <b-container fluid>
            <h1 class="text-center mt-5">Compte</h1>

            <div v-if="spinner" class="text-center mt-5">
                <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
            <div v-else class="mt-5">
                <b-row class="border border-dark rounded text-center mb-5 py-3 mx-5">
                    <b-col><strong>Compte créé le </strong>: {{ creation }}</b-col>
                    <b-col><strong>Pseudonyme </strong>: {{ pseudo }}</b-col>
                    <b-col><strong>Adresse mail </strong>: {{ mail }}</b-col>
                </b-row>

                <h3>Parties terminées :</h3>
                <b-table v-if="resultat" striped hover :items="parties" :fields="fields">
                    <template v-slot:cell(temps)="data">
                        {{ data.value }}
                    </template>
                </b-table>
                <p v-else>Aucunes parties n'a été terminées.</p>
            </div>
        </b-container>
    </div>
</template>

<script>
import axios from "axios";
import NavBar from "./NavBar";

export default {
    name: 'Compte',
    components: {
        NavBar
    },
    data () {
        return {
            url: "https://789a8d57.ngrok.io/",
            parties: [],
            tabVille: [],
            ville: null,
            fields: [
                { key: 'date', label: 'Fait le :', sortable: true },
                { key: 'ville', label: 'Ville', sortable: false },
                { key: 'photos', label: 'Nombre de photos', sortable: false },
                { key: 'score', label: 'Score', sortable: false },
                { key: 'temps', label: 'Fait en :', sortable: false }
            ],
            temps: null,
            zero: "",
            creation: null,
            mail: null,
            pseudo: null,
            spinner: true,
            resultat: false
        }
    },
    created: function() {
        axios.get(this.url + "joueurs/" + this.$route.params.props.dataUser.id, {
            headers: { 
                "Authorization": "Bearer " + this.$route.params.props.dataUser.token
            }
        })
        .then(response => {
            this.creation = new Date(response.data.joueur.created_at).toLocaleDateString();
            this.mail = response.data.joueur.mail;
            this.pseudo = response.data.joueur.pseudo;
        })
        .catch(error => {
            console.error(error);
        });

        axios.get(this.url + "series", {
            headers: { 
                "Authorization": "Bearer " + this.$route.params.props.dataUser.token
            }
        })
        .then(response => {
            response.data.series.forEach(serie => {
                this.tabVille.push({
                    id: serie.serie.idSerie,
                    ville: serie.serie.ville
                });
            });
        })
        .catch(error => {
            console.error(error);
        });

        axios.get(this.url + "joueurs/" + this.$route.params.props.dataUser.id + "/partiesTerminees", {
            headers: { 
                "Authorization": "Bearer " + this.$route.params.props.dataUser.token
            }
        })
        .then(response => {
            response.data.parties.forEach(partie => {
                this.tabVille.forEach(res => {
                    if(partie.partie.refSerie == res.id) this.ville = res.ville;
                })
                this.temps = new Date();
                this.temps.setTime(partie.partie.temps*1000);
                if(this.temps.getSeconds() < 10) this.zero = "0";
                else this.zero = "";
                this.parties.push({
                    date: new Date(partie.partie.updated_at).toLocaleDateString(),
                    ville: this.ville,
                    photos: partie.partie.nb_photos,
                    score: partie.partie.score,
                    temps: this.temps.getMinutes() + "min. " + this.zero + this.temps.getSeconds() + "sec."
                });
            });
            this.spinner = false;
            this.resultat = true;
        })
        .catch(error => {
            console.log(error)
            this.spinner = false;
            this.resultat = false;
        });
    }
}
</script>