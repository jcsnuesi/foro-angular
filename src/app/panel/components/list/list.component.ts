import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/components/service/user.service';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/components/service/topic.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'] ,
  providers: [UserService, TopicService]
})
export class ListComponent implements OnInit {

  public page_title: string;
  public topics:any;
  public identity;
  public token;
  public status: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = "Ver mis temas";
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()
 
  }

  ngOnInit(): void {
    this.getTopic()
  }

  getTopic(){
    var userId = this.identity.user._id

    this._topicService.getTopics(userId).subscribe(
      response =>{
        
        if (response.topic) {
          
          this.topics = response.topic;
          
        }

      },
      error =>{
        console.log(error)
      }
    )

  }

  deleteTopic(id:any){

    this._topicService.delete(this.token, id).subscribe(
      response =>{
        this.getTopic()
        console.log(response)
      },
      error =>{
        console.log(error)
      }
    )
    
  }



}
