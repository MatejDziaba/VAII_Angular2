import { Component } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.css'
})
export class EmptyComponent {
  ngOnInit() 
  {
    window.scrollTo(0, 100);
  }

}
