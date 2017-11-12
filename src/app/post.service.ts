import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Injectable } from "@angular/core";

@Injectable()
export class PostService {
  constructor(private http: Http) {}

  // Get all posts from the API
  getAllPosts() {
    return this.http.get("/api/posts").map(res => {
      console.log(res.json());
      return res.json()['data'];
    });
  }
}
