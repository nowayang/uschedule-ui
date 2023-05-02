import {Component, OnInit} from '@angular/core';
import {PlanSettingsService} from "./plan-settings.service";
import {Form, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-plan-settings',
  templateUrl: './plan-settings.component.html',
  styleUrls: ['./plan-settings.component.sass']
})
export class PlanSettingsComponent implements OnInit {
  formGroup: FormGroup | any;

  constructor(private planSettingsService: PlanSettingsService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.buildForm()
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      degree: [1],
      year: [1],
      group: [1],
    });
  }
}
