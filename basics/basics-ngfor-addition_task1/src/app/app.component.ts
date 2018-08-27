import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .white {
      color: white;
    }
  `]
})
export class AppComponent {
  showParagraph = true;
  ar = [];

  changeParagrpaph() {
    this.showParagraph = !this.showParagraph;
    this.ar.push(new Date());
  }
}
