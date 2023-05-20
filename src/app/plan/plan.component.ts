import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LogService} from "../core/log.service";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {Day, Plan} from "./plan.types";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.sass']
})
export class PlanComponent implements OnInit {
  plan: Plan | undefined;
  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private logService: LogService) {}

  ngOnInit(): void {
    this.route.data
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(resolvedData => {

        this.plan = resolvedData['plan'];
      }, error => {
        this.logService.log(error);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onSignOutClick() {
    this.authService.signOut().subscribe((user) => {
      this.logService.log(user);
      this.router.navigateByUrl("/auth").then();
    })
  }
}
