import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlanSettingsService} from "./plan-settings.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {first, Subject, switchMap, takeUntil} from "rxjs";
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
    this.planSettingsService.loadSettings().pipe(first()).subscribe((settings: Settings) => {
      this.logService.log("Settings loaded");
      this.onSettingsChanged(settings, { emitEvent: true });
      this.subscribeFormValueChanges();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private subscribeFormValueChanges() {
    this.formGroup.valueChanges
      .pipe(
        takeUntil(this.unsubscribeAll),
        switchMap((value: Settings) => this.planSettingsService.patchSettings(value))
      )
      .subscribe((settings: Settings) => {
        this.logService.log("Settings updated");
        this.onSettingsChanged(settings);
      });
  }

  private onSettingsChanged(settings: Settings, patchOptions: any = { emitEvent: false }) {
    const formGroup = this.formGroup as FormGroup;
    formGroup.patchValue(settings, patchOptions);
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      degree: [1],
      level: [1],
      groupIndex: [1],
      enableNotification: [false],
    });
  }
}
