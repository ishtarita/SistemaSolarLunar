<template>
    <div id="conteiner"></div>
</template>

<script>

import *  as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

export default {
  name: 'Simulador'
}

//variales globales
let conteiner;
let sceneWidth, sceneHeigh;
let scene;
let renderer;
let camera;
let controls;
let earth;
let sun;
let moon;


// lo que se ejecutara primero
mounted () {
	createScene();
	update();

}

function createScene(){
	sceneWidth = window.innerWidth;
	sceneHeigh = window.innerHeight;

	//Ecena
	scene = new THREE.Scene();
	screen.backgound = new THREE.Color(0x000000);

	//Render
	renderer = new THREE.WebGLRenderer({antialias: false, alfa: true});
	//dependiendo el dispositivo adecua el pixel
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(sceneWidth, sceneHeigh);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

	//canvas
	conteiner = document.getElementById("conteiner");
	conteiner.appendChild(renderer.domElement);

	//Camera
	camera = new THREE.PerspectiveCamera(45,sceneWidth / sceneHeigh, 1, 1000);
	camera.position.set(0, 250, 100);

	//luces
	let light = new THREE.PointLight(0Xffffff, 10);
	light.position.set(0,0,1);
	light.castShadow = true;
	scene.add(light)


	//luz que reflejan los elementos 
	let hemi = new THREE.HemisphereLight(0Xffffff, 0xfffffff, 0.2);
	hemi.position.set(0, 0 , 5);
	scene.add(hemi);

	controls = new OrbitControls(camera, renderer.domElement);
	controls.update();


	//esfera luna
	let geometriaMoon = new THREE.SphereGeometry(3.5, 3.5, 3.5);
	let materialMoon  = new THREE.MeshPhongMaterial({color: 0x9b9b9b, flatShading: false, shininess :0});
	moon = new THREE.Mesh(geometriaMoon, materialMoon);
	//moon.position.set (50,30,1)
	moon.castShadow = true;
	moon.receiveShadow = true;
	moon.translateX(20);	


	//esfera Tierra
	let geometriaEarth = new THREE.SphereGeometry(10, 10, 10);
	let materialEarth  = new THREE.MeshPhongMaterial ({color: 0x0000ff, flatShading: false, shininess :0});
	earth = new THREE.Mesh(geometriaEarth, materialEarth);
	//earth.position.set (50,0,1)
	earth.castShadow = true;
	earth.receiveShadow = true;
	
	earth.translateX(60);
	earth.add(moon);
	

	//torus Orbita
	let geometriaOrbit = new THREE.TorusGeometry( 60, 2, 154, 45 );
	let materialOrbit = new THREE.MeshPhongMaterial({color: 0x9b9b9b, flatShading: false, shininess :0});
	let orbit = new THREE.Mesh(geometriaOrbit, materialOrbit);

	//orbit.position.set (0,0,0)
	orbit.castShadow = true;
	orbit.receiveShadow = true;


	orbit.rotation.y = 0 ;
	orbit.rotation.x = 3800;
	orbit.rotation.z = 0;

	scene.add(orbit);

	//orbit.translateX(0);

	//esfera sol
	let geometriaSun = new THREE.SphereGeometry(15, 15, 15);
	let materialSun = new THREE.MeshPhongMaterial({color: 0xEF7F1A, emissive: 0xEF7F1A, flatShading: false});
	sun = new THREE.Mesh(geometriaSun, materialSun);
	sun.position.set (0,0,1);
	

	sun.add(earth);
	//sun.add(orbit);
	scene.add(sun);
	
}


function rotation(object, rad){
	let matrizYRotation = new THREE.Matrix4();
	matrizYRotation.makeRotationY(calcularRadianos(rad));
	object.applyMatrix(matrizYRotation);
}

function traslation(object, rad){

	let matrizAxisRotation = new THREE.Matrix4();
	let	matrizPosTraslation = new THREE.Matrix4();
	let	matrizOriginTranslation = new THREE.Matrix4();
	let	position = object.position;

	matrizAxisRotation.makeRotationY(calcularRadianos(rad));
	matrizPosTraslation .makeTranslation(position.x, position.y, position.z);
	matrizOriginTranslation.makeTranslation(-position.x, -position.y, -position.z);

	object.applyMatrix(matrizOriginTranslation);
	object.applyMatrix(matrizAxisRotation);
	object.applyMatrix(matrizPosTraslation );
}


function calcularRadianos(grau)
{
	return grau * Math.PI / 180;
}

function update(){
	requestAnimationFrame(update);
	render();
}

function render(){

	controls.update();	
	//prueba de como rota
	rotation(earth, 1);
	traslation(earth, 1.5);
	rotation(moon, 0.5);
	traslation(moon, 1);
	rotation(sun, 1);

	console.log(renderer.info.render.calls);
	renderer.render(scene, camera);

}
</script>

