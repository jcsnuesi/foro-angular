import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from 'src/app/models/user';
import { global } from '../service/global';
import { TopicService } from '../service/topic.service';
import { Topic } from 'src/app/models/topic';
import { Router, Route, Params, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [TopicService, UserService]
})
export class ProfileComponent implements OnInit {
  public user: User[] | any;
  public url:string;
  public topics: Topic[] | any;
  
  constructor(
    private _userService:UserService,
    private _topicService: TopicService,
    private _route: Router,
    private _router: ActivatedRoute
  ) {
    this.url = global.url;
   }

  ngOnInit(): void {
    this._router.params.subscribe(params => {
      var userId = params['id']

      this.getUser(userId);
      this.getTopic(userId)
    })
    
  }

  getUser(userId:any){
     this._userService.getUser(userId).subscribe(
      response =>{

        if (response.user) {
          this.user = response.user
          console.log(this.user)
        }else{

        }
       

      },
      error =>{
        console.log(error)
      }
     )

  }


  getTopic(userId:any) {
 

    this._topicService.getTopics(userId).subscribe(
      response => {

        if (response.topic) {

          this.topics = response.topic;
         

        }

      },
      error => {
        console.log(error)
      }
    )

  }

}
