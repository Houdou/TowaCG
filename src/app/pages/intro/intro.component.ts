import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import * as THREE from 'three';
import * as TowaCG from './towacg';

export class TowaIntroLine extends THREE.LineSegments {
	constructor(geometry?: THREE.Geometry | THREE.BufferGeometry,
		material?: THREE.LineDashedMaterial | THREE.LineBasicMaterial | THREE.ShaderMaterial | (THREE.LineDashedMaterial | THREE.LineBasicMaterial | THREE.ShaderMaterial)[], public originalScale: number = 1) {
		super(geometry, material);
	}
}

@Component({
	selector: 'towa-intro',
	templateUrl: './intro.component.html',
	styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit, AfterViewInit {

	@ViewChild('canvasholder')
	private canvasHolder: ElementRef;

	public scene: THREE.Scene;
	public camera: THREE.PerspectiveCamera;
	public renderer: THREE.WebGLRenderer;

	public cube: THREE.Mesh;

	private focus: boolean = false;

	private tsm: TowaCG.TowaScene;

	constructor() { }

	ngOnInit() {
	}

	ngAfterViewInit() {
		let canvasDiv: HTMLDivElement = this.canvasHolder.nativeElement

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 3000);
		this.camera.position.z = 1000;
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setClearColor(0x101010);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		// this.renderer.sortObjects = false;

		canvasDiv.appendChild(this.renderer.domElement);

		this.initScene();
		this.animate();

		window.addEventListener('resize', () => {this.onWindowResize()}, false);

		// onEnter:
		setTimeout(() => {this.focus = true;}, 2000);
	}

	public animate(): void {
		requestAnimationFrame(() => {this.animate()});
		this.renderer.render(this.scene, this.camera);
		this.render();
	}

	public render(): void {
		// var time = Date.now() * 0.0001;
		this.tsm.update();
	}

	public initScene(): void {
		this.tsm = new TowaCG.TowaScene(this.scene);

		let g = new TowaCG.Container();
		let gridMat = new THREE.LineBasicMaterial({color: 0xAABCE0, linewidth: 1});
		let grid = new TowaCG.Grid({cellSizeX: 36, cellSizeY: 20, cellHeight: 100, cellWidth: 100}, gridMat);
		
		let fillGroup = new TowaCG.Container();		
		for(let j = -8; j < 8; j++) {
			for(let i = -12; i < 18; i++) {
				// if(Math.random() > 0.6) continue;
				let fillMat = new THREE.MeshBasicMaterial({color: TowaCG.Random.OnHSL(0.58, 0.7, 0.5), opacity: 0, transparent: true});
				let f = new TowaCG.Fill({width: 99.5, height: 99.5, pos: grid.GetGridPos(i, j)}, fillMat);
				f.UseUpdateFunc((fill, deltaTime, args) => {
					fillMat.opacity = TowaCG.Lerp.Number(fillMat.opacity, args.toOpacity, deltaTime * 0.8);
					args.delay += deltaTime;
					if(args.delay >= args.updateInterval) {
						args.delay -= args.updateInterval;
						if(Math.random() > 0.6)
							args.toOpacity = Math.random() * Math.random() * 0.65 + 0.15;
					}
				}, {toOpacity: Math.random() * Math.random() * 0.65 + 0.15, updateInterval: 2.0, delay: Math.random() * 2.0});
				fillGroup.AddElement(f);
			}
		}

		let nodeGroup = new TowaCG.Container();
		for(let j = -8; j < 8; j++) {
			for(let i = -12; i < 18; i++) {
				if(Math.random() > 0.6) continue;
				let nodeBgMat = new THREE.MeshBasicMaterial({color: 0x202020});
				let dBg = new TowaCG.Fill({width: 10, height: 10, pos: grid.GetGridPos(i, j, true).add(new THREE.Vector3(0, 0, 0.5))}, nodeBgMat);
				dBg.obj.renderOrder = 1;
				let nodeMat = new THREE.MeshBasicMaterial({color: 0xFAFAFF});
				let d = new TowaCG.Fill({width: 6, height: 6, pos: grid.GetGridPos(i, j, true).add(new THREE.Vector3(0, 0, 1.5))}, nodeMat);
				d.obj.renderOrder = 2;
				
				nodeGroup.AddElement(dBg);
				nodeGroup.AddElement(d);
			}
		}
		g.AddElement(fillGroup);
		g.AddElement(grid);		
		g.AddElement(nodeGroup);

		g.obj.rotation.y = 0.12;
		// g.UseUpdateFunc((e, dt, args) => {
		// 	e.obj.rotation.y += dt * args.currentSpdY;
		// 	e.obj.rotation.x += dt * args.currentSpdX;
		// 	args.currentSpdY = TowaCG.Lerp.Number(args.currentSpdY, args.spdY, dt * 0.5);
		// 	args.currentSpdX = TowaCG.Lerp.Number(args.currentSpdX, args.spdX, dt * 0.1);
		// 	args.time += dt;
		// 	e.obj.scale.x = (0.1 * Math.sin(args.time) + 1);
		// 	e.obj.scale.y = (0.1 * Math.sin(args.time) + 1);
		// 	e.obj.scale.z = (0.1 * Math.sin(args.time) + 1);
		// }, {currentSpdY: 0, currentSpdX: 0, spdY: 0, spdX: 0, time: 0});
		// setInterval(() => {
		// 	g.updateArgs.spdY = Math.random() * 2 - 0.6;
		// 	g.updateArgs.spdX = Math.random() * 4 - 2;
		// }, 1000);
		this.tsm.AddElement(g);
	}

	public onWindowResize(): void {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}
}
