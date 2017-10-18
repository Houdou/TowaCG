import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'towa-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	private get title(): string {
		return "Houdou";
	}

	public hide: boolean = true;

	constructor() { }

	ngOnInit() {

	}

}
