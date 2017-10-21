import * as THREE from 'three';
import { AnimatedElement, Dot, Line } from './elements';

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