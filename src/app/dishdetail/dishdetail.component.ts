import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';

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
  rating :  number = 5;
  comment : Comment = new Comment();
  dishcopy: Dish | any; 

  dishErrMess: string = "";

  CommentForm: FormGroup | any;


  formErrors : any = {
    'author': '',
    'rating': 5,
    'comment': ''
  };

  validationMessages : any = {
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
    },
    'rating': {
      'required': 'rating is required.',
    },
    'comment': {
      'required': 'comment is required.',
    }
  };

  @ViewChild('cform') CommentFormDirective : any;

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('baseURL') private baseURL: any) {
      this.createForm();
     }

     BaseURL : any = this.baseURL;
     
  ngOnInit(): void {
    this.dishservice.getDishIds()
    .subscribe(dishIds => 
      this.dishIds = dishIds,
      dishErrmsg => this.dishErrMess = <any>dishErrmsg
    );
    this.route.params.pipe(switchMap((param : Params) => this.dishservice.getDish(param['id'])))    
     .subscribe(dish => {
      this.dish = dish;
      this.dishcopy = dish;
      this.setPrevNext(dish.id);
     },
     dishErrmsg => this.dishErrMess = <any>dishErrmsg);
  }

  setPrevNext(dishID : string){
    const index = this.dishIds.indexOf(dishID);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {
    this.CommentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [5, Validators.required],
      comment: ['', Validators.required],
    });  

    this.CommentForm.valueChanges
    .subscribe((data:any) => this.onValueChanged(data));
    this.onValueChanged();
  }


  onValueChanged(data?: any) {
    if (!this.CommentForm) { return; }
    const form = this.CommentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit(){
    this.comment = this.CommentForm.value;
    this.comment.date = new Date().toString();
    this.dish.comments.push(this.comment);
    this.dishservice.putDish(this.dish)
    .subscribe(dish =>{
      this.dish = dish;
      this.dishcopy = dish;
    },
    errMes => {
      this.dish = null;
      this.dishcopy =  null;
      this.dishErrMess = <any>errMes;
    });
    this.CommentForm.reset({
      author : '',
      rating : 5,
      comment : '',
      date : ''
    });

    this.CommentFormDirective.resetForm({
      rating : 5,
    });


  }
}
