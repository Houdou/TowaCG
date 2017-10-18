import * as THREE from 'three';
import { AnimatedElement, Dot, Line } from './elements';

export class Container extends AnimatedElement {
	public children: Array<AnimatedElement>
	public obj: THREE.Group;

	constructor(updateFunc: (e: AnimatedElement, t: number, args?: any) => any = null) {
		super(updateFunc);
		this.children = new Array<AnimatedElement>();
		this.obj = new THREE.Group();
	}

	public AddElement(e: AnimatedElement) {
		this.children.push(e);
		this.obj.add(e.obj);
	}
}

export class TowaScene {
	public elements: Array<AnimatedElement>;
	public currentTime: number;

	constructor(public scene: THREE.Scene) {
		this.elements = new Array<AnimatedElement>();
		this.currentTime = Date.now();
	}

	public AddElement(e: AnimatedElement) {
		this.elements.push(e);
		this.scene.add(e.obj);
	}

	public update() {
		let deltaTime = (Date.now() - this.currentTime) / 1000;
		this.currentTime = Date.now();
		this.elements.forEach(e => {
			e.update(deltaTime);
		});
	}
}