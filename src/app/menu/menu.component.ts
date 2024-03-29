import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations : [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes : Dish[] = DISHES;
  selectedDish : Dish | any;
  errMess: string = "";

  constructor(private dishService: DishService,
              @Inject('baseURL') private baseURL: any) { }

   BaseURL : any = this.baseURL;

  ngOnInit(): void {
    this.dishService.getDishes()
    .subscribe(
      dishes => this.dishes = dishes,
      errmsg => this.errMess = <any>errmsg
    );
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
