import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import { global } from './global'

@Injectable()
export class TopicService{
    public url: string;

    constructor(
        private _http : HttpClient 
    ){
        this.url = global.url
    }

  
    addTopic(token:any, topic:any): Observable<any>{
        let params = JSON.stringify(topic)
        let header = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token)

        return this._http.post(this.url + 'topic',params, {headers:header})
    }

    getTopics(userId:any):Observable<any>{
        let header = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.get(this.url + 'user-topics/' + userId, {headers:header})
    }

    getTopicById(id:any):Observable<any>{
        return this._http.get(this.url + 'topicId/'+id);

    }

    update(token:any, id:any, topic:any):Observable<any>{

        let params = JSON.stringify(topic);
        let header = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', token);

        return this._http.put(this.url + 'utopic/'+id, topic, { headers: header})

    }

    delete(token:any,id:any):Observable<any>{
  
        var header = new HttpHeaders().set('Content-type','application/json')
                                      .set('Authorization',token)
        return this._http.delete(this.url + 'dtopic/' + id, {headers:header})
    }
    getTopicsPage(page = 1):Observable<any>{

        return this._http.get(this.url + 'topics/'+page)
       
    }

    getTopicDetails(id:any):Observable<any>{

        return this._http.get(this.url + 'topicId/'+id)

    }

    search(searches:any):Observable<any>{
        return this._http.get(this.url + 'search/' + searches)
    }


}