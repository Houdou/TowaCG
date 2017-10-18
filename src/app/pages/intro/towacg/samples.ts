import * as THREE from 'three';

import { Dot } from './elements';
import { Random, Lerp } from './utils';
import { Container } from './manager';

export class Predefined {
	public static AtomCore(): Container {
		let g = new Container();
		for(let i = 0; i < 10; i++) {
			let mat = new THREE.PointsMaterial({size: 1, sizeAttenuation: false, color: Random.OnHSL(-1, 0.75, 0.7, 0.6, 0.8)});
			let d = new Dot(Random.OnSphereSurface(new THREE.Vector3(60 + i * i * 10, 60 + i * i * 10, 60 + i * i * 10), 1000 + i * 1000), mat);
			g.AddElement(d);
		}
		g.UseUpdateFunc((e, dt, args) => {
			e.obj.rotation.x += dt * args.currentSpdX;
			e.obj.rotation.y += dt * args.currentSpdY;
			args.currentSpdX = Lerp.Number(args.currentSpdX, args.spdX, dt * 0.1);
			args.currentSpdY = Lerp.Number(args.currentSpdY, args.spdY, dt * 0.5);
			args.time += dt;
			e.obj.scale.x = (0.1 * Math.sin(args.time) + 1);
			e.obj.scale.y = (0.1 * Math.sin(args.time) + 1);
			e.obj.scale.z = (0.1 * Math.sin(args.time) + 1);
		}, {currentSpdY: 0, currentSpdX: 0, spdY: 0, spdX: 0, time: 0});
		// setInterval(() => {
		// 	g.updateArgs.spdY = Math.random() * 4 - 1;
		// 	g.updateArgs.spdX = Math.random() * 6 - 3;
		// }, 1000);
		return g;
	}
}