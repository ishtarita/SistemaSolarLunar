import Vue from 'vue'
import Vuex from 'vuex'
import *  as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		sceneWidth: null,
		sceneHeigh: null,
		scene: null,
		renderer: null,
		camera: null,
		controls: null,
		earth: null,
		sun: null,
		moon: null,
		light: null,
		hemi: null,
		rotationEr: 1.5,
		traslacioEr: 1.5,
		rotationMo: 0.5,
		traslacioMon: 1,
		rotationSu: 1,
	},
	mutations: {
		createScene(state, el) {
			// tamaño de la escena
			state.sceneWidth = window.innerWidth;
			state.sceneHeigh = window.innerHeight;

			// Render
			state.renderer = new THREE.WebGLRenderer({ antialias: false, alfa: true });

			// dependiendo el dispositivo adecua el pixel
			state.renderer.setPixelRatio(window.devicePixelRatio);
			state.renderer.setSize(state.sceneWidth, state.sceneHeigh);
			state.renderer.shadowMap.enabled = true;
			state.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

			// Agrega al documento
			el.appendChild(state.renderer.domElement);

			// Camera
			state.camera = new THREE.PerspectiveCamera(45, state.sceneWidth / state.sceneHeigh, 1, 1000);
			state.camera.position.set(0, 250, 100);

			// Controls
			state.controls = new OrbitControls(state.camera, state.renderer.domElement);
			state.controls.update();

			// Escena
			state.scene = new THREE.Scene();
			state.scene.backgound = new THREE.Color(0x000000);

			// luces
			state.light = new THREE.PointLight(0Xffffff, 10);
			state.light.position.set(0, 0, 1);
			state.light.castShadow = true;
			state.scene.add(state.light)

			// luz que reflejan los elementos 
			state.hemi = new THREE.HemisphereLight(0Xffffff, 0xfffffff, 0.2);
			state.hemi.position.set(0, 0, 5);
			state.scene.add(state.hemi);

			// esfera luna
			let geometriaMoon = new THREE.SphereGeometry(3.5, 3.5, 3.5);
			let materialMoon = new THREE.MeshPhongMaterial({ color: 0x9b9b9b, flatShading: false, shininess: 0 });
			state.moon = new THREE.Mesh(geometriaMoon, materialMoon);
			// moon.position.set (50,30,1)
			state.moon.castShadow = true;
			state.moon.receiveShadow = true;
			state.moon.translateX(20);


			// esfera Tierra
			let geometriaEarth = new THREE.SphereGeometry(10, 10, 10);
			let materialEarth = new THREE.MeshPhongMaterial({ color: 0x0000ff, flatShading: false, shininess: 0 });
			state.earth = new THREE.Mesh(geometriaEarth, materialEarth);
			// earth.position.set (50,0,1)
			state.earth.castShadow = true;
			state.earth.receiveShadow = true;

			state.earth.translateX(60);
			state.earth.add(state.moon);

			// orbit.translateX(0);

			// esfera sol
			let geometriaSun = new THREE.SphereGeometry(15, 15, 15);
			let materialSun = new THREE.MeshPhongMaterial({ color: 0xEF7F1A, emissive: 0xEF7F1A, flatShading: false });
			state.sun = new THREE.Mesh(geometriaSun, materialSun);
			state.sun.position.set(0, 0, 1);

			state.sun.add(state.earth);
			// sun.add(orbit);
			state.scene.add(state.sun);

			// torus Orbita
			let geometriaOrbit = new THREE.TorusGeometry(60, 2, 154, 45);
			let materialOrbit = new THREE.MeshPhongMaterial({ color: 0x9b9b9b, flatShading: false, shininess: 0 });
			let orbit = new THREE.Mesh(geometriaOrbit, materialOrbit);

			// orbit.position.set (0,0,0)
			orbit.castShadow = true;
			orbit.receiveShadow = true;

			orbit.rotation.x = 90 * Math.PI / 180;

			state.scene.add(orbit);
		},
		rotation(state, payload) {
			var matrizYRotation = new THREE.Matrix4();
			matrizYRotation.makeRotationY(payload.rad * Math.PI / 180);
			payload.object.applyMatrix(matrizYRotation);
		},
		translation(state, payload) {
			var matrizAxisRotation = new THREE.Matrix4();
			var matrizPosTraslation = new THREE.Matrix4();
			var matrizOriginTranslation = new THREE.Matrix4();
			var position = payload.object.position;

			matrizAxisRotation.makeRotationY(payload.rad * Math.PI / 180);
			matrizPosTraslation.makeTranslation(position.x, position.y, position.z);
			matrizOriginTranslation.makeTranslation(-position.x, -position.y, -position.z);

			payload.object.applyMatrix(matrizOriginTranslation);
			payload.object.applyMatrix(matrizAxisRotation);
			payload.object.applyMatrix(matrizPosTraslation);
		},
		resize(state, { width, height }) {
			state.sceneWidth = width;
			state.sceneHeigh = height;
			state.camera.aspect = width / height;
			state.camera.updateProjectionMatrix();
			state.renderer.setSize(state.sceneWidth, state.sceneHeigh);
			state.controls.handleResize();
		},

		aumentarVelocidad(state){
			state.rotationEr += 0.5
			state.traslacioEr += 0.5

			state.rotationMo += 0.5
			state.traslacioMon += 0.5

			state.rotationSu +=0.5
		},
		disminuirVelocidad(state){

			state.rotationEr = state.rotationEr === 0 ? 0 : state.rotationEr -0.5
			state.traslacioEr = state.traslacioEr === 0 ? 0: state.traslacioEr -0.5 

			state.rotationMo = state.rotationMo=== 0 ? 0: state.rotationMo -0.5 
			state.traslacioMon = state.traslacioMon === 0 ? 0:  state.traslacioMon -0.5 

			state.rotationSu = state.rotationSu === 0 ? 0:  state.rotationSu -0.5 

		},


		pararVelocidad(state){
			state.rotationEr = 0
			state.traslacioEr = 0

			state.rotationMo = 0
			state.traslacioMon = 0

			state.rotationSu =0
		},

		iniciarAnimacion(state){
			state.rotationEr = 1.5
			state.traslacioEr = 1.5

			state.rotationMo = 0.5
			state.traslacioMon = 1

			state.rotationSu =  1
		},
	},
	actions: {
		render({ state, commit }, { el }) {
			return new Promise(resolve => {
				commit("createScene", el);
				state.renderer.render(state.scene, state.camera);
				resolve();
			});
		},
		rerender({ state, commit }) {
			return new Promise(resolve => {
				state.controls.update();
				commit("rotation", { object: state.earth, rad: state.rotationEr})
				commit("translation", { object: state.earth, rad:state.traslacioEr });

				commit("rotation", { object: state.moon, rad: state.rotationMo });
				commit("translation", { object: state.moon, rad: state.traslacioMon });

				commit("rotation", { object: state.sun, rad: state.rotationSu });
				state.renderer.render(state.scene, state.camera);
				resolve();
			});
		},
		update({ dispatch }) {
			requestAnimationFrame(() => {
				dispatch("update");
			});
			dispatch("rerender");
		}
	},

})