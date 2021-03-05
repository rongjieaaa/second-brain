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


  service?: RegularExpressionService;
  regularExpressionGroups?: RegularExpressionGroup[];


  regularExpressionGroup?: RegularExpressionGroup = undefined;

  constructor(service: RegularExpressionService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.getRegularExpressionGroups();
  }

  getRegularExpressionGroups() {
    this.service?.getRegularExpressionGroups().subscribe(regularExpressionGroups => {
      this.regularExpressionGroups = regularExpressionGroups;
      if(this.regularExpressionGroups?.length) {
        this.regularExpressionGroup = this.regularExpressionGroups[0];
      }
    });
  }

  transform(): void {
    if(this.regularExpressionGroup) {
      this.outputValue = this.inputValue;
      this.regularExpressionGroup?.regularExpressions.forEach(e => {
        var r = new RegExp(e.replace, 'g');
        this.outputValue = this.outputValue.replace(r, e.replaceValue);
      });
    }
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
