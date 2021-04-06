import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
// Loading

const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/NormalMap.png')
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry( .5, 64, 64 );

/*
const gltfLoader = new GLTFLoader();
const url = '/models/heart_made_of_strings/scene.gltf';
gltfLoader.load(url, (gltf) => {
    const root = gltf.scene
    scene.add(root)
}, ( xhr ) => {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

});
*/



// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights


// white light
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// red light
const pointLightRed = new THREE.PointLight(0xff0000, 2)
pointLightRed.position.set(-1.86,1,-1.65)
pointLightRed.intensity = 10
scene.add(pointLightRed)

const lightRed = gui.addFolder('Red Light')

lightRed.add(pointLightRed.position, 'y').min(-3).max(3).step(0.01)
lightRed.add(pointLightRed.position, 'x').min(-6).max(6).step(0.01)
lightRed.add(pointLightRed.position, 'z').min(-3).max(3).step(0.01)
lightRed.add(pointLightRed, 'intensity').min(0).max(10).step(0.01)

/*const pointLightHelper = new THREE.PointLightHelper(pointLightRed,1)
 scene.add(pointLightHelper)*/

// blue light

const pointLightBlue = new THREE.PointLight(0xe1ff, 2)
pointLightBlue.position.set(2.13,-3,-1.98)
pointLightBlue.intensity = 6.8
scene.add(pointLightBlue)

const bluLight = gui.addFolder('Blue Light')

bluLight.add(pointLightBlue.position, 'y').min(-3).max(3).step(0.01)
bluLight.add(pointLightBlue.position, 'x').min(-6).max(6).step(0.01)
bluLight.add(pointLightBlue.position, 'z').min(-3).max(3).step(0.01)
bluLight.add(pointLightBlue, 'intensity').min(0).max(10).step(0.01)

const blueLightColor = {
    color: 0xff0000
}

bluLight.addColor(blueLightColor, 'color')
    .onChange(() =>  pointLightBlue.color.set(blueLightColor.color))

/*const pointLightHelperBlue = new THREE.PointLightHelper(pointLightBlue,1)
scene.add(pointLightHelperBlue)*/

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/*const controls = new OrbitControls( camera, renderer.domElement )
camera.position.set( 0, 10, 10 )
controls.update()*/

/**
 * Animate
 */



let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

const onDocumentMouseMove = event => {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

document.addEventListener('mousemove', onDocumentMouseMove)

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.rotation.z += .5 * (targetY - sphere.rotation.z)

    // Update Orbital Controls
    // controls.update()

   // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
