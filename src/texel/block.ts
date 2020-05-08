import * as THREE from 'three';

export class Block {
    public geometry: THREE.BufferGeometry;
    public material: THREE.MeshPhongMaterial;
    public root: THREE.Mesh;

    constructor() {
        this.geometry = new THREE.BoxBufferGeometry(1, 1, 1, 1, 1, 1);
        this.material = new THREE.MeshPhongMaterial({ color: 0x347941 });
        this.root = new THREE.Mesh(this.geometry, this.material);
    }
}
