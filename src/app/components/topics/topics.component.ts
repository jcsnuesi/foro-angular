import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TopicService } from 'src/app/components/service/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [ TopicService]
})
export class TopicsComponent implements OnInit {
  public page_title: string;
  public topics: any;
  public status: any;
  public total_page: any;
  public page:any;
  public prev_page: any;
  public next_page: any;
  public number_pages: any;
  public nopaginate;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) { 
    this.page_title = "Todos los temas";
    this.nopaginate = false;
   
  }

  ngOnInit(): void {
    
    this._route.params.subscribe(params =>{
      var page = +params['page']

      if (!page) {
        page = 1
        this.prev_page = 1
        this.next_page = 2
      }
      this.getTopics(page)
    })
 
   
  }

  getTopics(page = 1){
    this._topicService.getTopicsPage(page).subscribe(
      response =>{
       
        if (response.topics) {
          this.topics = response.topics

          //Navegacion de la paginacion
          this.total_page = response.totalPages
         
          var number_pages = [];
          for (let index = 1; index <= this.total_page; index++) {
            number_pages.push(index)
            
          }
          this.number_pages = number_pages

          if (page >= 2) {
            this.prev_page = page - 1
          }else{
            this.prev_page = 1
          }

          if (page < this.total_page) {
            this.next_page = page + 1
          } else {
            this.next_page = this.total_page
          }

        }else{
          this._router.navigate(['/inicio'])
        }


      },
      error =>{
        console.log(error)
      }
    )
  }


}
