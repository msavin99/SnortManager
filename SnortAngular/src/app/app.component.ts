import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SnOrt Manager';
  searchString: string;
  constructor(private router: Router) {

  }
  goSearch(toSearch: string): void {
    if (toSearch != null || toSearch != '')
      this.router.navigate(['search',toSearch]);
  }
}


