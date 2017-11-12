import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CurrentUserService} from "../current-user.service";
import {User} from "../user";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
    ngOnInit(): void {
    }

    public authorCount: Number = 3;
    public currentUser$: Observable<User>;

    constructor(private currentUserService: CurrentUserService) {
        this.currentUser$ = currentUserService.getUser();
    }

    logout(): void {
        this.currentUserService.logout();
    }
}
