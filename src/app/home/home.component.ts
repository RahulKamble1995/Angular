import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { leadertype } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish: Dish = new Dish();
  promotion: Promotion = new Promotion();
  leader: leadertype = new leadertype();
  dishErorMsg : String = '';
  pramotionErrorMsg : String = '';
  leaderErrorMsg : String = '';

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService, private leaderService : LeaderService,
    @Inject('baseURL') private baseURL: any) { }

    BaseURL : any = this.baseURL;

  ngOnInit(): void {
    this.dishservice.getFeaturedDish().subscribe(
      dish => { this.dish = dish },
      dishErrormsg => {this.dishErorMsg = <any>dishErrormsg}
    );
    this.promotionservice.getFeaturedPromotion().subscribe(
      promotion => {this.promotion = promotion},
      pramoErrMsg => {this.pramotionErrorMsg = <any>pramoErrMsg}
    );
     this.leaderService.getFeaturedLeader().subscribe(
      leader => {this.leader = leader},
      leadErrMsg => {this.leaderErrorMsg = <any>leadErrMsg}
    );
  }

}
