import * as THREE from 'three';
import { CellCountX, CellCountY, CellSize } from './constant';

export class Helper {
    public root = new THREE.Object3D();

    constructor() {
        const grid = this.drawGrid();
        grid.position.x -= CellCountX * CellSize * 0.5;
        grid.position.y -= CellCountY * CellSize * 0.5;
        this.root.add(grid);
    }

    drawGrid(): THREE.Group {
        const grid = new THREE.Group();
		const material = new THREE.LineBasicMaterial({ color: 0xffffff });

        // draw X parallel lines

        const startX = 0;
        const endX = CellCountX * CellSize;
        const geometryX = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(startX, 0, 0), new THREE.Vector3(endX, 0, 0)]);

        for (let i = 0; i <= CellCountY; i++) {
            const y = i * CellSize;
            const line = new THREE.Line(geometryX, material);
            line.position.y = y;
            grid.add(line);
        }

        // draw Y parallel lines

        const startY = 0;
        const endY = CellCountY * CellSize;
        const geometryY = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, startY, 0), new THREE.Vector3(0, endY, 0)]);

        for (let i = 0; i <= CellCountX; i++) {
            const x = i * CellSize;
            const line = new THREE.Line(geometryY, material);
            line.position.x = x;
            grid.add(line);
        }

        return grid;
    }
}