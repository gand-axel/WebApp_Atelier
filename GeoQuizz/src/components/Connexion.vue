<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand><router-link class="text-white text-decoration-none" :to="{ name: 'Connexion' }">GeoQuizz</router-link></b-navbar-brand>
        </b-navbar>

        <b-container>
            <h1 class="text-center mt-5">Connexion</h1>

            <b-alert class="w-50 mx-auto" :show="dismissCountDown" dismissible variant="success" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
                <p>Votre compte a été créé avec succès !</p>
                <b-progress variant="success" :max="dismissSecs" :value="dismissCountDown" height="4px" />
            </b-alert>

            <b-alert class="w-50 mx-auto" v-model="showDismissibleAlert" variant="danger" dismissible>Une erreur s'est produite...</b-alert>

            <b-form v-if="form" @submit="submit" class="mt-5 w-50 mx-auto" >
                <b-form-group label="Entrez votre adresse mail :">
                    <b-form-input type="email" placeholder="Adresse mail" v-model="mail" required />
                </b-form-group>

                <b-form-group label="Entrez votre mot de passe :">
                    <b-form-input type="password" placeholder="Mot de passe" v-model="mdp" required />
                </b-form-group>

                <div class="text-center mt-5">
                    <b-button pill type="submit" variant="primary">Se connecter</b-button>
                    <p class="mt-5">Vous n'avez toujours pas de compte ? <u class="text-primary" style="cursor: pointer;" @click="boolean">Cliquez ici</u></p>
                </div>
            </b-form>

            <b-form v-else @submit="submitCreate" class="mt-5 w-50 mx-auto" >
                <b-form-group label="Entrez votre pseudonyme :">
                    <b-form-input type="text" placeholder="Pseudonyme" v-model="pseudo" required />
                </b-form-group>

                <b-form-group label="Entrez votre adresse mail :">
                    <b-form-input type="email" placeholder="Adresse mail" v-model="mail" required />
                </b-form-group>

                <b-form-group label="Entrez votre mot de passe :">
                    <b-form-input type="password" placeholder="Mot de passe" v-model="mdp" required />
                </b-form-group>

                <div class="text-center mt-5">
                    <b-button pill type="submit" variant="primary">Créer un compte</b-button>
                    <p class="mt-5">Vous avez déjà un compte ? <u class="text-primary" style="cursor: pointer;" @click="boolean">Connectez-vous</u></p>
                </div>
            </b-form>
        </b-container>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'Connexion',
    data () {
        return {
            /* url: "https://7a4b884a.ngrok.io/joueurs" */
            url: "http://localhost:19280/joueurs",
            form: true,
            mail: "",
            mdp: "",
            pseudo: "",

            dismissSecs: 5,
            dismissCountDown: 0,
            showDismissibleAlert: false
        }
    },
    methods: {
        submit(evt) {
            evt.preventDefault();
            axios.post(this.url + "/auth", {}, {
                auth: {
                    username: this.mail,
                    password: this.mdp
                }
            })
            .then(response => {
                this.$router.replace({ name: 'Accueil', params: { props: { dataUser: response.data } }});
            })
            .catch(error => {
                console.error(error);
            });
        },
        submitCreate(evt) {
            evt.preventDefault();
            axios.post(this.url, {
                mail: this.mail,
                pseudo: this.pseudo,
                mdp: this.mdp
            })
            .then(response => {
                this.dismissCountDown = this.dismissSecs
                this.form = true;
            })
            .catch(error => {
                this.showDismissibleAlert = true;
            });
        },
        boolean(){
            if(this.form) this.form = false;
            else this.form = true;
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        }
    }
}
</script>

<style scoped>

</style>
