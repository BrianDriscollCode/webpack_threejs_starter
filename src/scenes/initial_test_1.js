import * as THREE from "three";
import simple_shape from "../level_generation/simple_shape";
import main_camera from "../view_creator/main_camera";

function initial_test_1(sizes) {

    // Scene
    const scene = new THREE.Scene()

    //create objects
    const shapeFactory = new simple_shape
    const box1 = shapeFactory.box_instance();
    const box2 = shapeFactory.box_instance();
    box2.position.x = 5;
    scene.add(box1, box2)
    const initial_shapes = [box1, box2]; 

    //light
    const light = new THREE.AmbientLight( 0x404040 )
    scene.add( light )
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );
    console.log('add light')

    // Camera
    const cameraFactory = new main_camera(0, 0 , 6);
    const camera = cameraFactory.createCamera(sizes);

    return {scene, initial_shapes, camera}

}

export default initial_test_1
