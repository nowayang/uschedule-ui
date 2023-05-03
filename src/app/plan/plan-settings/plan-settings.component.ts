import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlanSettingsService} from "./plan-settings.service";
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {filter, map, Subject, takeUntil} from "rxjs";
import {Settings} from "../plan.types";
import {LogService} from "../../core/log.service";

@Component({
  selector: 'app-plan-settings',
  templateUrl: './plan-settings.component.html',
  styleUrls: ['./plan-settings.component.sass']
})
export class PlanSettingsComponent implements OnInit, OnDestroy {
  formGroup: FormGroup | any;

  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private planSettingsService: PlanSettingsService,
              private formBuilder: FormBuilder,
              private logService: LogService) {}

  ngOnInit(): void {
    this.formGroup = this.buildForm()
    this.formGroup.valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((value: Settings) => {
        this.planSettingsService.settings.next(value)
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      degree: [1],
      year: [1],
      group: [1],
    });
  }
}
