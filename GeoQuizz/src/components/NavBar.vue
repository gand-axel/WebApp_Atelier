<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand>
                <router-link class="text-white text-decoration-none" :to="{ name: 'Accueil', params: { props: { dataUser: this.$route.params.props.dataUser } } }">
                    <img src="../assets/logo.png" class="d-inline-block align-top" alt="logo" style="height: 1.5em"> GeoQuizz
                </router-link>
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item><router-link class="text-white text-decoration-none" :to="{ name: 'CreationPartie', params: { props: { dataUser: this.$route.params.props.dataUser } } }">Créer une partie</router-link></b-nav-item>
                    <b-nav-item><router-link class="text-white text-decoration-none" :to="{ name: 'Compte', params: { props: { dataUser: this.$route.params.props.dataUser } } }">Compte</router-link></b-nav-item>
                    <b-nav-item><router-link class="text-white text-decoration-none" :to="{ name: 'Regles', params: { props: { dataUser: this.$route.params.props.dataUser } } }">Règles du jeu</router-link></b-nav-item>
                </b-navbar-nav>
            </b-collapse>
            <b-button right variant="danger"><router-link class="text-white text-decoration-none" :to="{ name: 'Connexion' }">Déconnexion</router-link></b-button>
        </b-navbar>
    </div>
</template>