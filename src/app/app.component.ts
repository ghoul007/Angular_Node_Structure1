import { Component, OnInit } from "@angular/core";
import { PostService } from "./post.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  posts: any = [];

  constructor(private postService: PostService) {}
  ngOnInit(): void {
     this.postService.getAllPosts().subscribe(res => {
      this.posts = res;
    });
  }
}
