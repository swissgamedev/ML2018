import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location  
  ) { }

  ngOnInit() {
    this.processCurrentRoute(this.route.snapshot);
  }

  processCurrentRoute(currentRoute: ActivatedRouteSnapshot): void {
    console.dir(currentRoute);
  }
}
