<template>
	<div class="Botones">
		<button @click="aumentarVelocidad()" class ="aumentarVelocidad">Acelerar</button>
		<button @click="disminuirVelocidad()" class ="disminuirVelocidad">Disminuir</button>
		<button @click="pararVelocidad()" class ="pararAnimacion">Parar</button>
		<button @click="iniciarAnimacion()" class="iniciarAnimacion">Iniciar</button>
	</div>	
</template>

<script>
import { mapMutations } from 'vuex'

//import { mapActions, mapMutations } from "vuex";

export default {
	name: 'Botones',
	methods:{
		...mapMutations(["aumentarVelocidad", "pararVelocidad", "iniciarAnimacion", "disminuirVelocidad"]),
	}
}

</script>
