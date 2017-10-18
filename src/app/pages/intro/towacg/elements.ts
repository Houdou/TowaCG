import * as THREE from 'three';

export class AnimatedElement {
	public obj: THREE.Object3D;
	public updateArgs: any = {};

	constructor(protected updateFunc: (e: AnimatedElement, deltaTime: number, args?: any) => any) {

	}

	public update(deltaTime: number): void {
		if(this.updateFunc)
			this.updateFunc(this, deltaTime, this.updateArgs);
	}

	public UseUpdateFunc(f: (e: AnimatedElement, t: number, args?: any) => any, args?: any): void {
		this.updateFunc = f;
		this.updateArgs = args;
	}
}

export class Dot extends AnimatedElement {
	public geometry: THREE.Geometry;
	public obj: THREE.Points;

	constructor(pos: Array<THREE.Vector3>, public material: THREE.PointsMaterial, updateFunc: (dot: AnimatedElement, t: number, args?: any) => any = null) {
		super(updateFunc);
		this.geometry = new THREE.Geometry();
		this.geometry.vertices.push(...pos);
		this.obj = new THREE.Points(this.geometry, this.material);
	}
}

export class Line extends AnimatedElement {
	public geometry: THREE.Geometry;
	public obj: THREE.Line;

	constructor(pos: Array<THREE.Vector3>, public material: THREE.LineBasicMaterial | THREE.LineDashedMaterial, updateFunc: (dot: AnimatedElement, t: number, args?: any) => any = null) {
		super(updateFunc);
		this.geometry = new THREE.Geometry();
		this.geometry.vertices.push(...pos);
		this.obj = new THREE.Line(this.geometry, this.material);
	}
}

export class Fill {
	constructor() {

	}

}

export class MeshText {
	constructor() {

	}

}

export class MeshNode {
	constructor() {

	}

}

export class Grid {
	constructor() {

	}

}

export class Drawer {
	constructor() {

	}
	
}