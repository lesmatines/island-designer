import * as THREE from 'three';
import { Helper } from './helper';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Block } from './texel/block';
import { CellSize, CellCountX, CellCountY } from './constant';

export class Designer {
    public scene: THREE.Scene;
    public camera: THREE.Camera;
    public renderer: THREE.WebGLRenderer;
    public cameraControl: OrbitControls;

    constructor(container?: HTMLElement) {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor(0x83e1c3);
        if (container === undefined) {
            document.body.appendChild(renderer.domElement);
        } else {
            container.appendChild(renderer.domElement);
        }
        this.renderer = renderer;
        this.init();
    }

    public init(): void {
        this.scene = new THREE.Scene();

        this.camera = this.initCamera();
        this.cameraControl = this.initCameraControl();

        const helper = new Helper();
        this.scene.add(helper.root);

        const terrain = this.initTerrain();

        this.initLights();
    }

    private initCamera(): THREE.Camera {
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.up.set(0, 0, 1);
        camera.position.set(0, -10, 10);
        camera.lookAt(new THREE.Vector3());
        return camera;
    }

    private initCameraControl(): OrbitControls {
        const controls = new OrbitControls( this.camera, this.renderer.domElement );
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 2;
        controls.maxDistance = 500;
        controls.maxPolarAngle = Math.PI / 2;
        return controls;
    }

    private initLights(): void {
        const light1 = new THREE.DirectionalLight(0xffffee, 0.75);
        const light2 = new THREE.DirectionalLight(0xffeeff, 0.25);
        light1.position.set(-1, -2, 3);
        light2.position.set(1, 2, -3);
        this.scene.add(light1);
        this.scene.add(light2);
    }

    private initTerrain(): void {
        const positionList = [
            new THREE.Vector3(-50, -50, 0),
            new THREE.Vector3(-49, -50, 0),
            new THREE.Vector3(-50, -49, 0),
            new THREE.Vector3(-48, -50, 0),
            new THREE.Vector3(-50, -48, 0),
            new THREE.Vector3(-47, -47, 0),
            new THREE.Vector3(-51, -46, 0),
            new THREE.Vector3(-52, -45, 0),
            new THREE.Vector3(-51, -51, 0),
        ]
        positionList.forEach((position: THREE.Vector3) => {
            const block = new Block();
            const offset = new THREE.Vector3(-CellSize * 0.5 + 20, -CellSize * 0.5 + 20, CellSize * 0.5);

            block.root.position.copy(position.add(offset));
            this.scene.add(block.root);
        });

        const basicMap = new THREE.TextureLoader().load('./asset/basic_map.jpg');
        const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(CellCountX * CellSize, CellCountY * CellSize, 1, 1), new THREE.MeshBasicMaterial({ map: basicMap }));
        plane.position.set(0, 0, -0.01);
        this.scene.add(plane);
    }

    public frame(): void {
        this.renderer.render(this.scene, this.camera);
    }

    public start = (): void => {
        requestAnimationFrame(this.start);
        this.cameraControl.update();
        this.frame();
    }
}
