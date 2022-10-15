import { Component, OnInit } from '@angular/core';
import { TopicService } from '../service/topic.service';
import { Topic } from 'src/app/models/topic';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Comment } from 'src/app/models/comment'
import { UserService } from '../service/user.service';
import { CommentService } from '../service/comment.service';
import { global } from '../service/global';

@Component({
  selector: 'app-search',
  templateUrl: '../topics/topics.component.html',
  styleUrls: ['./search.component.css'],
  providers:[TopicService]
})
export class SearchComponent implements OnInit {
  public page_title;
  public topics: Topic[] | any;
  public status: any;
  public total_page: any;
  public page: any;
  public prev_page: any;
  public next_page: any;
  public number_pages: any;
  public nopaginate;
  

  constructor(
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.page_title = 'Buscar: '
    this.nopaginate = true
  }

  ngOnInit(): void {
    
    this._route.params.subscribe(params =>{
     
      var search = params['search']

      this.page_title = this.page_title + ' ' + search
   
      this.getTopics(search)

    })
   
  }

  getTopics(search: any){

    this._topicService.search(search).subscribe(

      response => {

        if (response.topics) {
          this.topics = response.topics
          console.log(response)
          
        }
        
      },
      error =>{
        console.log(error)
      }
    )
  }


}
