import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({
  providedIn: 'root',

})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  getAllPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-1c05a-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', {
      headers: new HttpHeaders({
        "Custorm-Header": "Hello",
      }),
      params: searchParams,
    })
    .pipe(map((responseData) => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty((key))) {
            postsArray.push({...responseData[key], id: key});
          }
        }
        return postsArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      }));
  }

  createPost(postData: Post) {
    return this.http.post<{ name: string }>('https://ng-complete-guide-1c05a-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      postData,
      {
        observe: 'response', //response gives back the whole response, not just the body
      }).subscribe(
      responseData => {
        alert('Create post successful!');
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      },
    );
  }

  clearAllPosts() {
    return this.http.delete<any>('https://ng-complete-guide-1c05a-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      {
        observe: 'events',
        responseType: 'json',
      }).pipe(tap(event => {
      console.log(event);
      if (event.type === HttpEventType.Sent) {

      }
      if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    }));
  }
}
