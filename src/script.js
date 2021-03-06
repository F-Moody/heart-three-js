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

const gltfLoader = new GLTFLoader();
const url = '/models/heart_made_of_strings/scene.gltf';
gltfLoader.load(url, (gltf) => {
    const root = gltf.scene
    scene.add(root)
}, ( xhr ) => {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

});



// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
// scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLightRed = new THREE.PointLight(0xff0000, 2)
pointLightRed.position.set(-1.86,1,-1.65)
pointLightRed.intensity = 10
scene.add(pointLightRed)

/*gui.add(pointLightRed.position, 'y').min(-3).max(3).step(0.01)
gui.add(pointLightRed.position, 'x').min(-6).max(6).step(0.01)
gui.add(pointLightRed.position, 'z').min(-3).max(3).step(0.01)
gui.add(pointLightRed, 'intensity').min(0).max(10).step(0.01)*/

const pointLightHelper = new THREE.PointLightHelper(pointLightRed,1)
// scene.add(pointLightHelper)

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

const controls = new OrbitControls( camera, renderer.domElement )
camera.position.set( 0, 10, 10 )
controls.update()

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
