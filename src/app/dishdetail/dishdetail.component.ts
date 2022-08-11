import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish | any;
  dishIds : String[] = [];
  prev : String = "";
  next : String = ""

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.dishservice.getDishIds()
    .subscribe(dishIds => 
      this.dishIds = dishIds
    );
    this.route.params.pipe(switchMap((param : Params) => this.dishservice.getDish(param['id'])))    
     .subscribe(dish => {
      this.dish = dish;
      this.setPrevNext(dish.id);
     });
  }

  setPrevNext(dishID : string){
    const index = this.dishIds.indexOf(dishID);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
