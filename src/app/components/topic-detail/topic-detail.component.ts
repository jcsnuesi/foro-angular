import { Component, OnInit } from '@angular/core';
import { TopicService } from '../service/topic.service';
import { Topic } from 'src/app/models/topic';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Comment } from 'src/app/models/comment'
import { UserService } from '../service/user.service';
import { CommentService } from '../service/comment.service';
import { global } from '../service/global';


@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [TopicService, UserService, CommentService]

})
export class TopicDetailComponent implements OnInit {
  public page_title: string;
  public topic: Topic |  any;
  public comment: Comment | any;
  public identity:any;
  public token:any;
  public status: any;
  public url;

  constructor(
    private  _topicService : TopicService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _commentService: CommentService
  ) { 
    this.page_title = ''
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    
    if (this.identity != null) {
      this.comment = new Comment('', '', '', this.identity.user)
  
    }
   
    this.url = global.url;
  }

  ngOnInit(): void {
  
    
    this.getTopicDetails()

  
  }

  getTopicDetails(){
    this._route.params.subscribe(params => {
      var id = params['id']

      this._topicService.getTopicDetails(id).subscribe(

        response =>{
         
            if (response.topics) {
             
              this.topic = response.topics[0]
              this.page_title = this.topic.title
          
            }else{
              this._router.navigate(['/inicio'])
            }

        },
        error =>{

          console.log(error)

        }
      )

    });
  }

  onSubmit(form:any){
    this._route.params.subscribe(param => {
      var topicId = param['id']


      this._commentService.addComment(this.token, this.comment, topicId).subscribe(
        response => {
         
          if (!response.comments) {
            this.status = 'error';
                        
          }else{
            this.status = 'success';
            this.topic = response.comments;
            form.reset()
          }

        },
        error => {
          this.status = 'error';
          console.log(error)


        }
      )

    })


  }

  deleteComment(commentId:any){

    this._commentService.deleteComment(this.token, commentId, this.topic._id).subscribe(

      response =>{
        if (response.status === 'error') {
          this.status = 'errorc';
        }else{

          this.getTopicDetails()
          this.status = 'successc';
        }
       

      },
      error =>{
        console.log(error)

      }
    )



  }


}
