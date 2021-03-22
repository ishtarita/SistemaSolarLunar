<template>
  <div id="app" >
    <Simulador/>
    <Botones/>
  </div>
</template>

<script>
import Simulador from './components/Simulador.vue'
import Botones from './components/Botones.vue'
//import Lista from './components/Lista.vue'

export default {
  name: 'App',
  components: {
    Simulador,
    Botones
  }
}
</script>


