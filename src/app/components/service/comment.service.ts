import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { global } from './global'

@Injectable()
export class CommentService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url
    }


    addComment(token: any, commets: any, topicId:any): Observable<any> {
        let params = JSON.stringify(commets)
        let header = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token)

        return this._http.post(this.url + 'comment/topic/' + topicId, params, { headers: header })
    }
  

    deleteComment(token: any, Commentid: any, topicId: any): Observable<any> {

        var header = new HttpHeaders().set('Content-type', 'application/json')
            .set('Authorization', token)
        return this._http.delete(this.url + 'comment/' + topicId + '/' + Commentid, { headers: header })
    }
  


}