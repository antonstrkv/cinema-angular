import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CONSTANTS } from 'src/app/app.constants';
import { Chips } from 'src/app/home/filters/filters.component';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class StepperComponent {
  CHECKBOXES: Chips[] = CONSTANTS.checkboxes;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });


  onChangeRating() {
    if (this.firstFormGroup.value.firstCtrl)
      this.searchService.changeRating(this.firstFormGroup.value.firstCtrl);
      console.log(this.firstFormGroup.value.firstCtrl)
  }

  onChangePopularity() {
    if (this.secondFormGroup.value.secondCtrl)
      this.searchService.changePopularity(this.secondFormGroup.value.secondCtrl);
  }

  onChangeActiveGeners(id: number) {
    this.searchService.changeActiveGeners(id);
  }

  constructor(private _formBuilder: FormBuilder, public searchService: SearchService) { }
}
