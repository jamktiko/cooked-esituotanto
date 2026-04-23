import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './appcom/appcom';
import { Uploadimg } from './uploadimg/uploadimg'
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppComponent, Uploadimg],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cooked-app');
}
