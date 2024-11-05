import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.scss']
})
export class QuickLinksComponent {
  selectedLink: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the 'id' parameter from the route
    this.route.paramMap.subscribe(params => {
      this.selectedLink = params.get('id')!;
    });
  }
}
