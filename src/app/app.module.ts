import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IntroComponent } from './pages/intro/intro.component';

// 3rd Libraries
import { SwiperModule } from 'angular2-useful-swiper';
import { HeaderComponent } from './pages/header/header.component';

@NgModule({
	declarations: [
		AppComponent,
		IntroComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		SwiperModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
