<script setup lang="ts">
interface Props {
  types: string[]
  iconHover?: boolean
}
const { types, iconHover } = defineProps<Props>()

</script>

<template>
  <v-sheet class='d-flex ga-3 justify-center mt-1'>
    <v-sheet v-for='type in types' :class="`icon ${type} ${iconHover ? 'iconHovered' : ''}`">
      <v-img :src="`/types/${type}.svg`" class='img' />
    </v-sheet>
  </v-sheet>
</template>

<style scoped>
.icon {
  border-radius: 100%;
  height: 50px;
  width: 50px;
  transition: 200ms all;
}

.iconHovered:hover {
  filter: saturate(120%);
  transform: scale(1.1);
  cursor: pointer;
}

.img {
  height: 60%;
  width: 60%;
  margin: 20%;
}

.bug {
  background: #92BC2C;
  box-shadow: 0 0 12px #92BC2C;
}

.dark {
  background: #595761;
  box-shadow: 0 0 12px #595761;
}

.dragon {
  background: #0C69C8;
  box-shadow: 0 0 12px #0C69C8;
}

.electric {
  background: #F2D94E;
  box-shadow: 0 0 12px #F2D94E;
}

.fire {
  background: #FBA54C;
  box-shadow: 0 0 12px #FBA54C;
}

.fairy {
  background: #EE90E6;
  box-shadow: 0 0 12px #EE90E6;
}

.fighting {
  background: #D3425F;
  box-shadow: 0 0 12px #D3425F;
}

.flying {
  background: #A1BBEC;
  box-shadow: 0 0 12px #A1BBEC;
}

.ghost {
  background: #5F6DBC;
  box-shadow: 0 0 12px #5F6DBC;
}

.grass {
  background: #5FBD58;
  box-shadow: 0 0 12px #5FBD58;
}

.ground {
  background: #DA7C4D;
  box-shadow: 0 0 12px #DA7C4D;
}

.ice {
  background: #75D0C1;
  box-shadow: 0 0 12px #75D0C1;
}

.normal {
  background: #A0A29F;
  box-shadow: 0 0 12px #A0A29F;
}

.poison {
  background: #B763CF;
  box-shadow: 0 0 12px #B763CF;
}

.psychic {
  background: #FA8581;
  box-shadow: 0 0 12px #FA8581;
}

.rock {
  background: #C9BB8A;
  box-shadow: 0 0 12px #C9BB8A;
}

.steel {
  background: #5695A3;
  box-shadow: 0 0 12px #5695A3;
}

.water {
  background: #539DDF;
  box-shadow: 0 0 12px #539DDF;
}
</style>