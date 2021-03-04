import { Injectable } from '@angular/core';


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

  constructor() { }

  onInit() {

  }

  getRegularExpressionGroups(): Array<RegularExpressionGroup> {
    return [
      {
        title: "Entity转数据库结构定义",
        previewBeforeConversion: "/// <summary>\n/// 项目Id\n/// </summary>\n[NotNull]\npublic virtual Guid ProjectId { get; protected set; }\n/// <summary>\n/// 数量\n/// </summary>\n[NotNull]\npublic virtual decimal Quantity { get; set; }\n/// <summary>\n/// 单位\n/// </summary>\npublic virtual string Unit { get; set; }",
        previewAfterConversion: "//(Guid) 项目Id [NotNull]\nb.Property(x => x.ProjectId).IsRequired();\n//(decimal) 数量 [NotNull]\nb.Property(x => x.Quantity).IsRequired().HasPrecision(11, 4);\n//(string) 单位\nb.Property(x => x.Unit).HasMaxLength(______Consts.MaxUnitLength);",
        regularExpressions: [
          {
            title: '去掉缩进',
            replace: '\n\ {1,}',
            replaceValue: '\n',
          },
          {
            title: '修改xml格式的注释为单行注释',
            replace: '/// <summary>\n/// (.*)\n/// </summary>',
            replaceValue: '//$1',
          },
          {
            title: '转换{特性}到注释',
            replace: '\n\\[(.*?)\\](.*?)\n',
            replaceValue: ' [$1]\n',
          },
          {
            title: '添加{类型}到注释',
            replace: '//(.*?)\npublic (virtual)? (.*?) (.*)',
            replaceValue: '//($3) $1\npublic $2 $3 $4',
          },
          {
            title: '转换{属性}为委托',
            replace: 'public (virtual)? (.*?) (.*?) {.*?}',
            replaceValue: 'b\.Property\(x => x\.$3\);',
          },
          {
            title: '为特性[NotNull]加IsRequired()',
            replace: '\\[NotNull\\](.*?)\n(.*?);',
            replaceValue: '[NotNull]$1\n$2\.IsRequired\(\);',
          },
          {
            title: '为decimal类型的属性加长度限制',
            replace: '(\\(decimal??\\).*?\n.*?x\\.)(.*?)(\\).*?);',
            replaceValue: '$1$2$3\.HasPrecision\(11, 4\);',
          },
          {
            title: '为int类型的属性加长度限制',
            replace: '(\\(int??\\).*?\n.*?x\\.)(.*?)(\\).*?);',
            replaceValue: '$1$2$3\.HasMaxLength\(______Consts\.Max$2Length\);',
          },
          {
            title: '为string类型的属性加长度限制',
            replace: '(\\(string\\).*?\n.*?x\\.)(.*?)(\\).*?);',
            replaceValue: '$1$2$3\.HasMaxLength\(______Consts\.Max$2Length\);',
          },
        ],
        description: "由建好的Entity代码，自动转化为数据库结构定义。目前支持：1.识别[NotNull]特性，为不可空的属性加上必填的限定IsRequired()。2.自动为字符串类型的属性加上长度的限定HasMaxLength()，但是由于目前常量没有好的方式自动统一，需要手动替换下环线部分。3.自动为decimal类型的属性加上精度限定HasPrecision，默认(11,4)位，需要手动替换。5.转换后，不需要的属性定义，部分请自行删除。"
      },
      {
        title: "由Entity转DTO",
        regularExpressions: [
          {
            title: '去掉缩进',
            replace: '\n\ {1,}',
            replaceValue: '\n',
          },
          {
            title: "去除virtual关键字",
            replace: "virtual ",
            replaceValue: "",
          },
          {
            title: "更换特性[NotNull]为[Required]",
            replace: "\\[NotNull\\]",
            replaceValue: "[Required]",
          },
          {
            title: '为string类型的属性加长度限制',
            replace: '\n(.*?) (string.*?) (.*?) (.*)\n',
            replaceValue: '\n[DynamicStringLength(typeof(______Consts), nameof(______Consts.Max$3Length))]\n$1 $2 $3 $4\n',
          }
        ]
      },
      {
        title: "由表格转Entity",
        previewBeforeConversion: "wegwege\nwqegweg",
        previewAfterConversion: "wegwegwe\negwegweg",
        regularExpressions: [
          {
            title: "初步转换",
            replace: "(.*?)\t(.*?)\t(.*?)\t(.*?)\t(.*?)\n",
            replaceValue: "/// <summary>\n/// $1\n/// $2\n/// </summary>\n[$3]\npublic virtual $4 $5 { get; set; }\n",
          },
          {
            title: "去除无效备注",
            replace: "\n/// \n",
            replaceValue: "\n",
          },
          {
            title: "去除无效特性",
            replace: "\n\\[\\]\n",
            replaceValue: "\n",
          }
        ]
      },
    ];
  }

  transform(inputValue: string, regularExpressions: Array<RegularExpression>): string {
    var result = inputValue;
    regularExpressions.forEach(e => {
      result = result.replace(new RegExp(e.replace, 'g'), e.replaceValue);
    });
    return result;
  }


}
