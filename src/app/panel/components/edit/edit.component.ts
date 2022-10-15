import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/components/service/user.service';
import { Topic } from 'src/app/models/topic';
import { TopicService } from 'src/app/components/service/topic.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../add/add.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService, TopicService]
})
export class EditComponent implements OnInit {

  public page_title: any;
  public topic: Topic;
  public identity;
  public token;
  public status: any;
  public is_edit: boolean;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = "Editar nuevo tema";
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()
    this.topic = new Topic('', '', '', '', '', '', this.identity.user._id, null)
    this.is_edit = true
  }
  ngOnInit(): void {
    this.getTopicById();
    this.is_edit
    
  }

  onSubmit(form :any){
    
    var id =  this.topic._id;
    this._topicService.update(this.token, id, this.topic).subscribe(
      response =>{

        if (response.topic) {
          this.status = 'success'
          this.topic = response.topic
         
        }else{

          this.status = 'error'

        }

      },
      error =>{
        this.status = 'error'
        console.log(error)

      }
    )

  }
  
  getTopicById(){
    this._route.params.subscribe((params) => {
      let id = params['id']

      this._topicService.getTopicById(id).subscribe(
        response => {
       
          if (!response.topics) {
            this._router.navigate(['/panel']);

          } else {

            this.topic = response.topics[0];
            
          }


        },
        error => {
          this.status = 'error'
          console.log(error)
        
        });

    });

  }

}
