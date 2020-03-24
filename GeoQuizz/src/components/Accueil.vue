<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand><router-link class="text-white text-decoration-none" :to="{ name: 'Accueil' }">GeoQuizz</router-link></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item><router-link class="text-white text-decoration-none" :to="{ name: 'CreationPartie', params: { props: { dataUser: this.$route.params.props.dataUser } } }">Créer une partie</router-link></b-nav-item>
                    <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
                </b-navbar-nav>
            </b-collapse>

            <b-button right variant="danger"><router-link class="text-white text-decoration-none" :to="{ name: 'Connexion' }">Déconnexion</router-link></b-button>
        </b-navbar>
        <h1 class="text-center mt-5">Bienvenue sur GeoQuizz</h1>
    </div>
</template>

<script>
export default {
    name: 'Accueil',
    data () {
        return {
            
        }
    },
    created: function() {
        //console.log(this.$route.params.props.dataUser)
    }
}
</script>

<style scoped>

</style>
