<template>
  <div id="informations">
    <p>Infos</p>
    <h2>Débatteurs</h2>
    <h2>Descriptions</h2>
    <p>
      Modifier ses gènes, se faire opérer par des robots, avoir un exosquelette,
      vivre plusieurs siècles… Par bien des aspects, le transhumanisme semble
      être de la science-fiction qui se prend au sérieux. Notre avenir est-il
      vraiment promis à une hybridation homme-machine ? Médecine prédictive,
      données et santé La médecine thérapeutique se transforme en médecine
      prédictive. Prévoir, avec plusieurs années d’avance, l’apparition d’une
      maladie en repérant des gènes défectueux ; corriger des gènes dans
      l’embryon pour épargner au bébé une maladie héréditaire. Comment garantir
      que ces données personnelles ne serviront pas, un jour, à produire des
      bébés génétiquement modifiés afin de choisir la couleur de leurs cheveux
      ou d’augmenter leurs capacités intellectuelles ? Robots et e-santé
      Jusqu’où les robots doivent-ils remplacer les humains ? Prothèses,
      exosquelettes et autres essais d’implants pour modifier et augmenter les
      capacités cérébrales et corporelles. Ces recherches concrétisent ce qui
      était jusqu'alors une utopie lointaine : vivre plus longtemps en
      augmentant le « potentiel » humain. Les dangers pour l’homme et la
      démocratie Fabriquer un être humain supérieur, artificiel, voire immortel,
      dont les imperfections seraient réparées et les capacités améliorées :
      telle est l’ambition du mouvement transhumaniste. Avec le risque de voir
      se développer une sous-humanité de plus en plus dépendante de technologies
      qui modèlera son corps et son cerveau, ses perceptions et ses relations
      aux autres.
    </p>
  </div>
</template>

<script>
export default {
  name: "informations"
};
</script>

<style lang="scss" scoped>
#informations {
  padding: 20px 25px;

  @media (min-width: 640px) {
    height: calc(74vh - 80px);
    overflow: auto;
    position: relative;
  }
}
</style>
