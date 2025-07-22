import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCheckComponent } from './input-check/input-check.component';
import { FeedbackComponent } from './feedback/feedback.component';



@NgModule({
  declarations: [
    InputCheckComponent,
    FeedbackComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
