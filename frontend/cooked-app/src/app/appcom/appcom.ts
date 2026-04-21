// app.component.ts
import { Component, inject, signal, OnInit } from '@angular/core';
import { Dataservice } from '../dataservice';

@Component({
  selector: 'app-appcom',
  template: `
<h1>Backend Data</h1>
<div>
  @if (items()) {
    <p>{{ items() }}</p>
  } @else {
    <p>Ladataan...</p>
  }
</div>
  `
})
export class AppComponent implements OnInit {
  private dataService = inject(Dataservice);
  
  // Käytetään signaalia datan tallennukseen
  items = signal<any>([]);

  ngOnInit() {
    this.dataService.getItems().subscribe({
      next: (data) => this.items.set(data),
      error: (err) => console.error('Hups!', err)
    });
  }
}