import './style.css'
import * as THREE from 'three'
import { CubeCamera } from 'three'

// Scene
const scene = new THREE.Scene()

// Object setup
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const capsuleGeometry = new THREE.CapsuleGeometry(1, 1, 4, 8)
const material = new THREE.MeshLambertMaterial({ 
    color: '#F1B21F' })

    
const objectsDistance = 4;    
//Shapes
const box1 = new THREE.Mesh(boxGeometry, material)
const box2 = new THREE.Mesh(boxGeometry, material)
const capsule = new THREE.Mesh(capsuleGeometry, material)


box1.position.y = - objectsDistance * 0;
box2.position.y = - objectsDistance * 1;
capsule.position.y = - objectsDistance * 2;

box1.position.x = -2;
box1.position.x = 4;
capsule.position.x = 2


//Group 
const group1 = new THREE.Group();
group1.add( box1 )
group1.add( box2 )
group1.add( capsule )
scene.add(group1)

//light
const light = new THREE.AmbientLight( 0x404040 )
scene.add( light )
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Dynamically Resize
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

//Camera Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 6
cameraGroup.add(camera)

const canvas = document.querySelector('canvas.webgl')

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Scroll 
let scrollY = window.scrollY;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    console.log(scrollY)
})

const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

function animate() {
    requestAnimationFrame( animate )

    //Animate camera
    camera.position.y = - scrollY / sizes.height * objectsDistance;
    const parallaxX = cursor.x;
    const parallaxY = -cursor.y;
    cameraGroup.position.x = parallaxX;
    cameraGroup.position.y = parallaxY;

    for (let i = 0; i < group1.children.length; i++) {
        group1.children[i].rotation.x += 0.01;
        group1.children[i].rotation.y += 0.01;
    }

    renderer.render(scene, camera)
}

animate();