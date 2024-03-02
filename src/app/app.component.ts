import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from "./post.model";
import {PostsService} from "./posts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {
  }

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(
      errorMessage => {
        this.error = errorMessage;
      },
    );
    this.fetchPosts();
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createPost(postData);
    this.fetchPosts();

  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.clearAll();
  }

  onHandleError() {
    this.error = null;
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postsService.getAllPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      // this.isFetching = false;
      // this.error = error.message;
      this.error = error.error.error;
    });
  }

  private clearAll() {
    this.postsService.clearAllPosts().subscribe(
      () => {
        alert('Clear all posts successful!');
        this.fetchPosts();
      },
    );
  }

}
