<template>
  <div>
    <NavBar />
    <b-container class="mt-3">
      <b-row>
        <b-col align-self="center">
          <h5 class="mt-3">Règles du jeu :</h5>
          <ul>
            <li>
              <h6>Quel est le but du jeu ?</h6>
            </li>
            <p>Le but du jeu est très simple, vous avez une série de photos concernant une ville. Votre but sera de trouver la localisation de chaque photos sur la map. A savoir qu'une photo peut correspondre à une place, un bâtiment historique ou même encore un restaurant ou un bar.</p>
            <p>
              <strong>A noter que la position du photographe n'a aucune importance, il suffit juste de trouver ce qu'il y a sur la photo.</strong>
            </p>
            <li>Comment jouer ?</li>
            <p>
              Pour jouer c'est très simple, il vous suffit de créer une partie avec la série souhaitée et le nombre de photos souhaité. Soit vous créez la partie pour y jouer un autre moment, soit vous êtes impatient de jouer et vous pouvez lancer le jeu directement en cliquant sur le bouton "Jouer".
              Une fois le jeu lancé, vous arrivez sur une page avec une map et une photo. Le but est de trouver la position de l'endroit indiqué sur la photo, pour cela rien de plus simple, prenez le petit marqueur sur la mini map et déplacez le à l'endroit ou vous pensez que la photo se situe.
            </p>
            <p class="text-danger"><strong>Attention</strong> vous avez un temps limité pour trouver l'endroit.</p>
            <p>Une fois le temps arrivé à 0, vous passez à la photo suivante et vous marquez 0 point. Alors soyez rapide...</p>
            <li>Comment marquer des points ?</li>
            <p>Pour marquer des points c'est très simple, plus vous êtes proche des coordonnées réelles de la photo, plus vous marquez de points.</p>
            <p>De plus la rapidité est une arme très puissante dans ce jeu, si vous trouvez la position en moins de 5 secondes les points sont multipliés par 4, entre 5 et 10 secondes par 2 et au delà de 10 secondes multiplié par 1. Et si vous ne trouvez pas avant la fin du temps c'est 0 point.</p>
            <p><strong>N'oubliez pas de valider votre marqueur en cliquant sur le bouton "Suivant" ou "Valider".</strong></p>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from "./NavBar";
export default {
  name: "Regles",
  components: {
    NavBar
  }
};
</script>