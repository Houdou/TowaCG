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
		this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 3000);
		this.camera.position.z = 1000;
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setClearColor(0x101010);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setPixelRatio(window.devicePixelRatio);

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
		// var i, line, vertex1, vertex2, material, p, parameters = [ [ 0.25, 0xFFAAAA, 1, 2 ], [ 0.5, 0xff9900, 1, 1 ], [ 0.75, 0xffaa00, 0.75, 1 ], [ 1, 0xffaa00, 0.5, 1 ], [ 1.25, 0x0088FF, 0.8, 1 ], [ 3.0, 0xaaaaaa, 0.75, 2 ], [ 3.5, 0xffffff, 0.5, 1 ], [ 4.5, 0xffffff, 0.25, 1 ], [ 5.5, 0xffffff, 0.125, 1 ] ];

		// let g = this.createGeometry();

		// for(i = 0; i < parameters.length; i++) {
		// 	p = parameters[i];

		// 	material = new THREE.LineBasicMaterial( { color: p[ 1 ], opacity: p[ 2 ], linewidth: p[ 3 ] } );

		// 	line = new TowaIntroLine( g, material, p[ 0 ]);
		// 	line.scale.x = line.scale.y = line.scale.z = p[ 0 ];
		// 	line.rotation.y = Math.random() * Math.PI;
		// 	line.updateMatrix();
		// 	this.scene.add( line );
		// }
		this.tsm = new TowaCG.TowaScene(this.scene);

		let g = new TowaCG.Container();
		for(let i = 0; i < 10; i++) {
			let mat = new THREE.PointsMaterial({size: 1, sizeAttenuation: false, color: TowaCG.Random.OnHSL(-1, 0.75, 0.7, 0.6, 0.8)});
			let d = new TowaCG.Dot(TowaCG.Random.OnSphereSurface(new THREE.Vector3(60 + i * i * 10, 60 + i * i * 10, 60 + i * i * 10), 1000 + i * 1000), mat);
			g.AddElement(d);
		}
		g.UseUpdateFunc((e, dt, args) => {
			e.obj.rotation.y += dt * args.currentSpdY;
			e.obj.rotation.x += dt * args.currentSpdX;
			args.currentSpdY = TowaCG.Lerp.Number(args.currentSpdY, args.spdY, dt * 0.5);
			args.currentSpdX = TowaCG.Lerp.Number(args.currentSpdX, args.spdX, dt * 0.1);
			args.time += dt;
			e.obj.scale.x = (0.1 * Math.sin(args.time) + 1);
			e.obj.scale.y = (0.1 * Math.sin(args.time) + 1);
			e.obj.scale.z = (0.1 * Math.sin(args.time) + 1);
		}, {currentSpdY: 0, currentSpdX: 0, spdY: 0, spdX: 0, time: 0});
		setInterval(() => {
			g.updateArgs.spdY = Math.random() * 2 - 0.6;
			g.updateArgs.spdX = Math.random() * 4 - 2;
		}, 1000);
		this.tsm.AddElement(g);
	}

	public onWindowResize(): void {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}
}
