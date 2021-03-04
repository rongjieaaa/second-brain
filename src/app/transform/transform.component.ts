import { Component, OnInit } from '@angular/core';
import { RegularExpressionGroup, RegularExpression, RegularExpressionService } from './regular-expression.service';


@Component({
  selector: 'app-transform',
  templateUrl: './transform.component.html',
  styleUrls: ['./transform.component.css']
})
export class TransformComponent implements OnInit {

  inputValue: string = "";
  outputValue: string = "";


  regularExpressionService?: RegularExpressionService;
  regularExpressionGroups?: Array<RegularExpressionGroup> = [];
  regularExpressionGroup?: RegularExpressionGroup;

  isEditRegularExpression: boolean = false;
  regularExpression?: RegularExpression;

  constructor(regularExpressionService: RegularExpressionService) {
    this.regularExpressionService = regularExpressionService;
  }

  ngOnInit(): void {
    this.regularExpressionGroups = this.regularExpressionService?.getRegularExpressionGroups();
    if(this.regularExpressionGroups?.length) {
      this.regularExpressionGroup = this.regularExpressionGroups[0];
    }
  }

  transform(): void {
    this.outputValue = this.inputValue;
    this.regularExpressionGroup?.regularExpressions.forEach(e => {
      var r = new RegExp(e.replace, 'g');
      this.outputValue = this.outputValue.replace(r, e.replaceValue);
    });
  }

  // editRegularExpression(data: RegularExpression) {
  //   this.regularExpression = data;
  //   let transformParameters = [
  //     'replace',
  //     'replaceValue'
  //   ]
  //   this.regularExpression.replace = this.regularExpression.replace.replace('\n', '\\n');
  //   this.regularExpression.replaceValue = this.regularExpression.replaceValue.replace('\n', '\\n');
  //   this.isEditRegularExpression = true;
  // }
  // handleEditRegularExpressionOk() {
  //   this.isEditRegularExpression = false;

  //   this.regularExpression.replace = this.regularExpression?.replace.replace(new RegExp('\n'), 'aaa');
  //   this.regularExpression.replaceValue = this.regularExpression?.replaceValue.replace(new RegExp('\\n'), 'aaa');
  // }

}
