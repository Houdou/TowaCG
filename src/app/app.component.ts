import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';

	private towaSwiperConfig: any = {
		direction: 'vertical',
		speed: 800,
		simulateTouch: false,
		slidesPerView: 1,
		mousewheelControl: true
	};
}
