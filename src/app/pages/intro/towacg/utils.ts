import * as THREE from 'three';

export class Random {
	public static OnSphereSurface(radius: THREE.Vector3, count: number = 0,
			center: THREE.Vector3 = new THREE.Vector3(0, 0, 0)): Array<THREE.Vector3> {
		let arr = new Array<THREE.Vector3>();
		for(let i = 0; i < count; i++) {
			let v = new THREE.Vector3(2 * Math.random() - 1, 2 * Math.random() - 1, 2 * Math.random() - 1);
			v.normalize();
			v.multiply(radius).add(center);
			arr.push(v);
		}
		return arr;	
	}

	/**
	 * [OnHSL description]
	 * @param  {number   = -1}          h [description]
	 * @param  {number   = -1}          s [description]
	 * @param  {number   = -1}          l [description]
	 * @return {THREE.Color}   [description]
	 */
	public static OnHSL(h: number = -1, s: number = -1, l: number = -1,
			hmin: number = 0.0, hmax: number = 1.0,
			smin: number = 0.0, smax: number = 1.0,
			lmin: number = 0.0, lmax: number = 1.0): THREE.Color {
		h = h < 0 ? (Math.random() * (hmax - hmin) + hmin) % 1 : h;
		s = s < 0 ? (Math.random() * (smax - smin) + smin) % 1 : s;
		l = l < 0 ? (Math.random() * (lmax - lmin) + lmin) % 1 : l;
		return new THREE.Color().setHSL(h, s, l);
	}
}

export class Lerp {
	public static Number(current: number, target: number, t: number): number {
		if(t <= 0) return current; if(t >= 1) return target;
		else return current * (1 - t) + target * t;
	}
}