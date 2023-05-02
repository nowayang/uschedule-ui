import {Component, Input} from '@angular/core';
import {Lesson} from "../plan.types";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.sass']
})
export class LessonComponent {
  @Input('lesson') lesson: Lesson | undefined;
}
