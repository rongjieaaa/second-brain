import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export class RegularExpressionGroup {
  title: string = "未命名";
  previewBeforeConversion?: string;
  previewAfterConversion?: string;
  regularExpressions: Array<RegularExpression> = [];
  description?: string;
}

export class RegularExpression {
  title: string = "未命名";
  replace: string = "";
  replaceValue: string = "";
}

@Injectable({
  providedIn: 'root'
})
export class RegularExpressionService {

  private apiUrl = 'api/RegularExpressions';

  constructor(private http: HttpClient) { }

  onInit() {

  }

  getRegularExpressionGroups(): Observable<RegularExpressionGroup[]> {
    return this.http.get<RegularExpressionGroup[]>(this.apiUrl);
  }
  save(regularExpressionGroup: RegularExpressionGroup) {
    return this.http.post(this.apiUrl, regularExpressionGroup);
  }

  transform(inputValue: string, regularExpressions: Array<RegularExpression>): string {
    var result = inputValue;
    regularExpressions.forEach(e => {
      result = result.replace(new RegExp(e.replace, 'g'), e.replaceValue);
    });
    return result;
  }


}
