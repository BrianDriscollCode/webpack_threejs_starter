import * as THREE from 'three';

class simple_shape {

    constructor() {
        this.material = new THREE.MeshLambertMaterial({
            color: '#F1B21F'
        })
        this.boxGeometry = new THREE.BoxGeometry(1,1,1);
    }

    box_instance = () => {

        const box = new THREE.Mesh(this.boxGeometry, this.material);
        return box;

    }
}

export default simple_shape;