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

export class Container extends AnimatedElement {
	public children: Array<AnimatedElement>
	public obj: THREE.Group;

	constructor(updateFunc: (e: AnimatedElement, t: number, args?: any) => any = null) {
		super(updateFunc);
		this.children = new Array<AnimatedElement>();
		this.obj = new THREE.Group();
	}

	public update(deltaTime: number): void {
		this.children.forEach(e => {
			e.update(deltaTime);
		});
		super.update(deltaTime);
	}

	public AddElement(e: AnimatedElement) {
		this.children.push(e);
		this.obj.add(e.obj);
	}
}

export interface DotParameter {
	dots?: Array<THREE.Vector3>
}

export class Dot extends AnimatedElement {
	public geometry: THREE.Geometry;
	public obj: THREE.Points;

	constructor(public param: DotParameter, public material: THREE.PointsMaterial, updateFunc: (dot: AnimatedElement, t: number, args?: any) => any = null) {
		super(updateFunc);
		//Default parameter
		param.dots = param.dots || new Array<THREE.Vector3>();

		this.geometry = new THREE.Geometry();
		this.geometry.vertices.push(...param.dots);
		this.obj = new THREE.Points(this.geometry, this.material);
	}
}

export class Line extends AnimatedElement {
	public geometry: THREE.Geometry;
	public obj: THREE.Line;

	constructor(pos: Array<THREE.Vector3>, public material: THREE.LineBasicMaterial | THREE.LineDashedMaterial,
			public isCountinuous: boolean = true,
			updateFunc: (line: AnimatedElement, t: number, args?: any) => any = null) {
		super(updateFunc);
		this.geometry = new THREE.Geometry();
		if(!isCountinuous && pos.length % 2 != 0) {
			console.warn("The line must have even vertices");
			pos.push(pos[pos.length - 1]); // Duplicate the last one
		}
		this.geometry.vertices.push(...pos);
		if(isCountinuous)
			this.obj = new THREE.Line(this.geometry, this.material);
		else
			this.obj = new THREE.LineSegments(this.geometry, this.material);
	}
}

export class Box extends AnimatedElement {
	public geometry: THREE.Geometry;
	public obj: THREE.Line;

	constructor(pos: Array<THREE.Vector3>, size: number, public material: THREE.LineBasicMaterial | THREE.LineDashedMaterial,
			updateFunc: (box: AnimatedElement, t: number, args?: any) => any = null) {
		super(updateFunc);
		this.geometry = new THREE.Geometry();

	}
}

export interface FillParameter {
	pos?: THREE.Vector3;
	width?: number;
	height?: number;
	widthSegment?: number;
	heightSegment?: number;
}

export class Fill extends AnimatedElement {
	public geometry: THREE.Geometry;

	constructor(public param: FillParameter, public material: THREE.Material, updateFunc: (fill: AnimatedElement, t: number, args?: any) => any = null) {
		super(updateFunc);
		param.width = param.width || 10;
		param.height = param.height || 10;
		param.widthSegment = param.widthSegment || 1;
		param.heightSegment = param.heightSegment || 1;
		param.pos = param.pos || new THREE.Vector3(-param.width / 2, -param.height / 2, 0);

		this.geometry = new THREE.PlaneGeometry(param.width, param.height, param.widthSegment, param.heightSegment);
		this.obj = new THREE.Mesh(this.geometry, this.material);
		this.obj.position.add(param.pos);
	}

}

export class Text {
	constructor() {

	}

}

export class GridNode extends Container {
	constructor(updateFunc: (node: AnimatedElement, t: number, args?: any) => any = null) {
		super(updateFunc);
		// Add a dot
		// Add a box
	}

}

export interface GridParameter {
	pos?: THREE.Vector3,
	cellSizeX?: number,
	cellSizeY?: number,
	cellHeight?: number
	cellWidth?: number,
}

export class Grid extends Container {
	constructor(public param: GridParameter, public material: THREE.LineBasicMaterial | THREE.LineDashedMaterial, updateFunc: (grid: AnimatedElement, t: number, args?: any) => any = null) {
		super(updateFunc);
		// Default parameter:
		param.cellSizeX = param.cellSizeX || 10;
		param.cellSizeY = param.cellSizeY || 10;
		param.cellHeight = param.cellHeight || 100;
		param.cellWidth = param.cellWidth || 100;
		param.pos = param.pos || new THREE.Vector3(- param.cellSizeX * param.cellWidth / 2,
			- param.cellSizeY * param.cellHeight / 2, 0);


		// Horizontal lines
		for(let v = 0; v <= param.cellSizeY; v++) {
			let l = new Line((new Array(param.cellSizeX + 1)).fill(0).map((c, i) => {
				return new THREE.Vector3(i * param.cellWidth, v * param.cellHeight, 0);
			}), material, true);
			this.AddElement(l);
		}
		for(let u = 0; u <= param.cellSizeX; u++) {
			let l = new Line((new Array(param.cellSizeY + 1)).fill(0).map((c, i) => {
				return new THREE.Vector3(u * param.cellWidth, i * param.cellHeight, 0);
			}), material, true);
			this.AddElement(l);
		}
		this.obj.position.add(param.pos);
	}

	public GetGridPos(x: number, y: number, onLine: boolean = false): THREE.Vector3 {
		if(onLine)
			return new THREE.Vector3(x * this.param.cellWidth, y * this.param.cellHeight);
		else
			return new THREE.Vector3((x - 0.5) * this.param.cellWidth, (y - 0.5) * this.param.cellHeight);
	}
}

export class Drawer {
	constructor() {

	}
	
}