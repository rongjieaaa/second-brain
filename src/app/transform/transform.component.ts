import { Component, OnInit } from '@angular/core';

class RegularExpression {
  title: string = "未命名";
  source: string = "";
  target: string = "";
  edit: boolean = false;
}

@Component({
  selector: 'app-transform',
  templateUrl: './transform.component.html',
  styleUrls: ['./transform.component.css']
})
export class TransformComponent implements OnInit {

  inputValue: string = "aaa[NotNull]aaa]";
  outputValue: string = "";

  regularExpressions: Array<RegularExpression> = [];

  constructor() {
  }

  ngOnInit(): void {
    //将类成员转换为数据库结构定义
    this.regularExpressions = [
      {
        title: '去掉缩进',
        source: '\n        ',
        target: '\n',
        edit: false,
      },
      {
        title: '修改xml格式的注释为单行注释',
        source: '/// <summary>\n/// (.*)\n/// </summary>',
        target: '//$1',
        edit: false,
      },
      {
        title: '转换{特性}到注释',
        source: '\n\\[(.*?)\\](.*?)\n',
        target: ' [$1]\n',
        edit: false,
      },
      {
        title: '添加{类型}到注释',
        source: '//(.*?)\npublic (virtual)? (.*?) (.*)',
        target: '//($3) $1\npublic $2 $3 $4',
        edit: false,
      },
      {
        title: '转换{属性}为委托',
        source: 'public (virtual)? (.*?) (.*?) {.*?}',
        target: 'b\.Property\(x => x\.$3\);',
        edit: false,
      },
      {
        title: '为特性[NotNull]加IsRequired()',
        source: '\\[NotNull\\](.*?)\n(.*?);',
        target: '[NotNull]$1\n$2\.IsRequired\(\);',
        edit: false,
      },
      {
        title: '为decimal类型的属性加长度限制',
        source: '(\\(decimal\\??\\).*?\n.*?x\\.)(.*?)(\\).*?);',
        target: '$1$2$3\.HasPrecision\(11, 4\);',
        edit: false,
      },
      {
        title: '为string类型的属性加长度限制',
        source: '(\\(string\\).*?\n.*?x\\.)(.*?)(\\).*?);',
        target: '$1$2$3\.HasMaxLength\(______Consts\.Max$2Length\);',
        edit: false,
      }
      // {
      //   title: '将属性转为委托',
      //   source: '\npublic (virtual)? (.*?) (.*?) {.*?}',
      //   target: '\($2\)\nb\.Property\(x => x\.$3\);',
      //   edit: false,
      // },
      // {
      //   title: '转换[NotNull]',
      //   source: '\n\\[NotNull\\](.*?)\n(.*?);',
      //   target: '$1\n$2\.IsRequired\(\);',
      //   edit: false,
      // },
    ];
  }

  transform(): void {
    // var regR = /\r/g;
    // var regN = /\n/g;
    // this.outputValue = this.inputValue.replace(regR,"回").replace(regN,"车");
    this.outputValue = this.inputValue;
    this.regularExpressions.forEach(e => {
      var r = new RegExp(e.source, 'g');
      this.outputValue = this.outputValue.replace(r, e.target);
    });
    // this.outputValue = this.inputValue.replace(/"(.*?)": "string",/g,'"$1": "$1",');
  }

  textAreaKeyDown(event: Event): void {
    if(event != null) {
      var target = event.target;
      var selection = document.getSelection();
      debugger;
    }
  }

}
