import Vue from 'vue';
import Router from 'vue-router';
import Connexion from '@/components/Connexion';
import Accueil from '@/components/Accueil';
import Compte from '@/components/Compte';
import CreationPartie from '@/components/CreationPartie';
import Jeu from '@/components/Jeu';
import ReglesJeu from '@/components/ReglesJeu';
import NotFound from '@/components/NotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Connexion',
      component: Connexion
    },
    {
      path: '/accueil',
      name: 'Accueil',
      component: Accueil
    },
    {
      path: '/compte',
      name: 'Compte',
      component: Compte
    },
    {
      path: '/creation_partie',
      name: 'CreationPartie',
      component: CreationPartie
    },
    {
      path: '/jeu',
      name: 'Jeu',
      component: Jeu
    },
    {
      path: '/regles',
      name: 'Regles',
      component: ReglesJeu
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
});
