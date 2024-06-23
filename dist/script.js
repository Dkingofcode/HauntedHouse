import './styles.css';
import * as THREE from 'three';
import GUI from 'lil-gui';
//import imgSource from './finewood.jpg';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import gsap from 'gsap';
import { Timer } from 'three/examples/jsm/misc/Timer.js';
import { MeshGouraudMaterial } from 'three/examples/jsm/materials/MeshGouraudMaterial.js';
//import url from './static/Snow010A_4K-PNG_AmbientOcclusion.png'
import { Sky } from "three/examples/jsm/objects/Sky.js";


const gui  = new GUI();

// canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene;

/**
 *   Textures
 */
const textureLoader = new THREE.TextureLoader()

let texture = new THREE.CanvasTexture(new FlakesTexture());


// Floor
const floorAlphaTexture = textureLoader.load('./static/jason-clarke-moonlight-srgb-no-tags.webp');
const floorColorTexture = textureLoader.load('./static/coast_sand_rocks_02_diff_1k.webp');
const floorARMTexture = textureLoader.load('./static/coast_sand_rocks_02_arm_1k.webp');
const floorNormalTexture = textureLoader.load('./static/coast_sand_rocks_02_nor_gl_1k.webp');
const floorDisplacementTexture = textureLoader.load('./static/coast_sand_rocks_02_disp_1k.webp');

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

 floorColorTexture.repeat.set(4, 4);
 floorARMTexture.repeat.set(4, 4);
 floorNormalTexture.repeat.set(4, 4);
 floorDisplacementTexture.repeat.set(4, 4);


 floorColorTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping


floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

// Wall
const wallColorTexture = textureLoader.load('./static/castle_brick_broken_06_diff_1k.webp')
const wallARMTexture = textureLoader.load('./static/castle_brick_broken_06_arm_1k.webp')
const wallNormalTexture = textureLoader.load('./static/castle_brick_broken_06_nor_gl_1k.webp')

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

// Roof
const roofColorTexture = textureLoader.load('./static/roof_slates_02_diff_1k.webp')
const roofARMTexture = textureLoader.load('./static/roof_slates_02_arm_1k.webp')
const roofNormalTexture = textureLoader.load('./static/roof_slates_02_nor_gl_1k.webp')

roofColorTexture.colorSpace = THREE.SRGBColorSpace
roofColorTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping


// Bush
const bushColorTexture = textureLoader.load('./static/leaves_forest_ground_diff_1k.webp');
const bushARMTexture = textureLoader.load('./static/leaves_forest_ground_arm_1k.webp');
const bushNormalTexture = textureLoader.load('./static/leaves_forest_ground_nor_gl_1k.webp');

bushColorTexture.colorSpace = THREE.SRGBColorSpace;

bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping


// Grave
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_diff_1k.webp')
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_arm_1k.webp')
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_nor_gl_1k.webp')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

// Door
const doorColorTexture = textureLoader.load('./static/wooden_garage_door_diff_1k.webp')
const doorAlphaTexture = textureLoader.load('./static/Snow010A.webp')
const doorAmbientOcclusionTexture = textureLoader.load('./static/wooden_garage_door_diff_1k.webp')
const doorHeightTexture = textureLoader.load('./static/wooden_garage_door_disp_1k.webp')
const doorNormalTexture = textureLoader.load('./static/wooden_garage_door_nor_gl_1k.webp')
const doorMetalnessTexture = textureLoader.load('./static/wooden_garage_door_arm_1k.webp')
const doorRoughnessTexture = textureLoader.load('./static/wooden_garage_door_arm_1k.webp')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight('grey', 1);
scene.add(ambientLight);

gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001);

const directionalLight = new THREE.DirectionalLight('grey', 1)
directionalLight.position.set(3, 2, -7);
scene.add(directionalLight);




// Objects
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 32),
//      new THREE.MeshStandardMaterial({ roughness: 0.7 })
// )


// scene.add(sphere);

// floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
       alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: -0.2
    })
)
floor.rotation.x = -Math.PI * 0.5
scene.add(floor);

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacement');

gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorBias');

// House container
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture
    })
)
walls.position.y = 1.25
house.add(walls);


// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
)
roof.position.y = 2.5 + 0.75;
roof.rotation.y = 1
house.add(roof);

//  Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
    
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
    })
)
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);


//  Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({

    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(1.4, 0.2, 2.2);
bush1.rotation.x = - 0.75
house.add(bush1);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(-1.4, 0.2, 2.6);
bush2.rotation.x = - 0.75
house.add(bush2);


const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(2.0, 0.3, 2.9)
bush3.rotation.x = - 0.75
house.add(bush3);


const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = - 0.75
house.add(bush4);


//  Graves
const graveGeometry = new THREE.BoxGeometry(0.3, 0.4, 0.1);
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture
});

const graves = new THREE.Group()
scene.add(graves);

for(let i = 0; i < 30; i++){

    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 1;
    const x = Math.sin(angle) * radius;
    const y= Math.cos(angle) * radius;
    console.log(graves);

    //Mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
     grave.position.x = x;
     grave.position.y = Math.random() * 0.1;
     grave.position.z = y;
     grave.rotation.x = (Math.random() - 0.5) * 0.4;
     grave.rotation.y = (Math.random() - 0.5) * 2;
     grave.rotation.z = (Math.random() - 0.5) * 0.4;

    // add grave to group
     graves.add(grave);
}

 // Door light
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)


/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3);

 // Sizes
 const sizes = {
    width: 800,
    height: 600
}

window.addEventListener('resize', () => {

//     // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

//     // Update Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


 // Camera
 const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
//const camera = new THREE.OrthographicCamera(sizes.width/ -2, sizes.width / 2, sizes.height / 2, sizes.height / -2, 1, 100);
// const camera = new THREE.OrthographicCamera(sizes.width/ -2, sizes.width / 2, sizes.height / 2, sizes.height / -2, 1, 100);
camera.position.z = 3;
camera.position.y = 3;
camera.position.z = 3;
//camera.lookAt(mesh.position);
scene.add(camera);


// COntrols
 const controls = new OrbitControls(camera, canvas);
 controls.enableDamping = true;
 
 
 // Renderer
 const renderer = new THREE.WebGLRenderer({
     canvas: canvas
 })
 
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

 renderer.shadowMap.enabled = true;


  // Render
  renderer.render(scene, camera);
  
  /**
   * Shadows
  */
 renderer.shadowMap.enabled = true
 renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // Cast and recieve
 directionalLight.castShadow = true;
 ghost1.castShadow = true;
 ghost2.castShadow = true;
 ghost3.castShadow = true;

 walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for(const grave of graves.children)
   {
       grave.castShadow = true
       grave.receiveShadow = true
   }

   directionalLight.shadow.mapSize.width = 256
   directionalLight.shadow.mapSize.height = 256
   directionalLight.shadow.camera.top = 8
   directionalLight.shadow.camera.right = 8
   directionalLight.shadow.camera.bottom = - 8
   directionalLight.shadow.camera.left = - 8
   directionalLight.shadow.camera.near = 1
   directionalLight.shadow.camera.far = 20

   ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10


// /*
//   Sky
// */

 const sky = new Sky();
 sky.scale.set(100, 100, 100);
 scene.add(sky)

 sky.material.uniforms['turbidity'].value = 10
 sky.material.uniforms['rayleigh'].value = 3
 sky.material.uniforms['mieCoefficient'].value = 0.1
 sky.material.uniforms['mieDirectionalG'].value = 0.95
 sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)


/**
 * Fog
 */
//scene.fog = new THREE.Fog('#ff0600', 1, 13)
scene.fog = new THREE.FogExp2('#02343f', 0.1)


/**
* Animate
*/
const time = new Timer();

const tick = () =>
{
   // Timer
   time.update() 
   const elapsedTime = time.getElapsed();

   // Update controls
   controls.update();

   // Ghost
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
   ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.14);
  
    const ghost2Angle = - elapsedTime * 0.38
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)   

    const ghost3Angle = elapsedTime * 0.23
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)

   

  

   // Update controls
   controls.update();
 
   // render
   renderer.render(scene, camera);


   // Call tick again on the next frame
   window.requestAnimationFrame(tick);
}

tick();
