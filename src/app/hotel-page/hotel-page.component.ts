import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.css']
})
export class HotelPageComponent implements OnInit {

  title: string;

  constructor(private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.data.subscribe((result) => {
      this.title = result.title;
    });
  }

}
