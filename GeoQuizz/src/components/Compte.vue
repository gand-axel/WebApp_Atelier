<template>
    <div>
        <NavBar />
        <h1 class="text-center mt-5">Compte</h1>

        <b-table striped hover :items="parties" :fields="fields" />
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
            url: "https://c84bcdc8.ngrok.io/",
            parties: [],
            tabVille: [],
            ville: null,
            fields: [
                { key: 'date', label: 'Fait le :', sortable: true },
                { key: 'ville', label: 'Ville', sortable: false },
                { key: 'photos', label: 'Nombre de photos', sortable: false },
                { key: 'score', label: 'Score', sortable: false },
                { key: 'temps', label: 'Fait en :', sortable: false }
            ]
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
                this.parties.push({
                    date: new Date(partie.partie.updated_at).toLocaleDateString(),
                    ville: this.ville,
                    photos: partie.partie.nb_photos,
                    score: partie.partie.score,
                    temps: partie.partie.temps
                });
            });
        })
        .catch(error => {
            console.error(error);
        });
    }
}
</script>