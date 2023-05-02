import {Component} from '@angular/core';
import {AuthService} from "../core/auth/auth.service";
import {Router} from "@angular/router";
import {LogService} from "../core/log.service";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.sass']
})
export class PlanComponent {

  constructor(private authService: AuthService,
              private router: Router,
              private logService: LogService) {}

  onSignOutClick() {
    this.authService.signOut().subscribe((user) => {
        this.logService.log(user);
        this.router.navigateByUrl("/auth").then();
      })
  }
}
