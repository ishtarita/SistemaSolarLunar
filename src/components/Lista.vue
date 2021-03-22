<template>
<div>
	<h1>Frutas</h1>
	<ul class="list-group">
		<li v-for="(item, index) of frutas" :key="item.id" @click="aumetar(index)"
		class="list-group-item d-flex justify-content-between align-items-center">
			{{index}}-{{item.nombre}}
			<span class="badge badge-primary badge-pill">{{item.cantidad}}</span>	
		</li>
	</ul>
</div>
</template>


<script>

import{mapState, mapMutations} from 'vuex';


export default {
	name: 'Lista',
	computed:{
		...mapState(['frutas'])
	}, 
	methods:{
		...mapMutations(['aumentar'])
	}
}
</script>