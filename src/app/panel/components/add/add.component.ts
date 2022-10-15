import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/components/service/user.service';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/components/service/topic.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, TopicService]
})
export class AddComponent implements OnInit {
  public page_title: string;
  public topic: Topic;
  public identity;
  public token;
  public status: any;
  public is_edit: any;

  constructor(
    private _route: ActivatedRoute,
    private _router:Router,
    private _userService: UserService,
    private _topicService : TopicService
  ) {
    this.page_title = "Crear nuevo tema";
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()
    this.topic = new Topic('', '', '', '', '', '', this.identity.user._id, null)
    this.is_edit = null
   }

  ngOnInit(): void {


  }

  onSubmit(form:any){
this._topicService.addTopic(this.token,this.topic).subscribe(

  response => {

    if (response.topic) {
      this.status = 'success';
      this.topic = response.topic
      
      form.reset()
    }else{
      this.status = 'error'
    }


  },
  error => {
    this.status = 'error';
    console.log(error);
   }
)
  

  }

}
