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
        title: "普通Dto转ExcelDto",
        previewBeforeConversion: "",
        previewAfterConversion: "",
        regularExpressions: [
          {
            title: '去掉缩进',
            replace: '\n\ {1,}',
            replaceValue: '\n',
          },
          {
            title: '由类的注释转换成注解',
            replace: '(/// <summary>\n/// )(.*)(\n/// </summary>\n)(.*?class)',
            replaceValue: '$1$2$3\[ExcelExporter\(Name = "$2", TableStyle = TableStyles.Light10, AutoFitAllColumn = true\)\]\n$4',
          },
          {
            title: '由属性的注释转换成注解',
            replace: '(/// <summary>\n/// )(.*)(\n/// </summary>\n)(.*?{ get; set; })',
            replaceValue: '$1$2$3\[ExporterHeader\(DisplayName  = "$2"\)\]\n$4',
          },
          {
            title: 'decimal的格式化',
            replace: '\\)\\]\n(.*?)decimal',
            replaceValue: ', Format = "#,##0"\)\]\n$1decimal',
          },
        ],
        description: ""
      },
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
            title: "去除virtual关键字",
            replace: "virtual ",
            replaceValue: "",
          },
          {
            title: '转换{特性}到注释',
            replace: '\n\\[(.*?)\\](.*?)\n',
            replaceValue: ' [$1]\n',
          },
          {
            title: '添加{类型}到注释',
            replace: '//(.*?)\n(public|protected|private) (.*?) ',
            replaceValue: '//($3) $1\n$2 $3 ',
          },
          {
            title: '转换{属性}为委托',
            replace: '(public|protected|private) (.*?) (.*?) {.*?}',
            replaceValue: 'b\.Property\(x => x\.$3\);',
          },
          {
            title: '添加{默认值}到注释和委托',
            replace: '//(.*?)\n(.*?); = (.*?);',
            replaceValue: '//$1 (默认 = $3)\n$2.HasDefaultValue($3);',
          },
          {
            title: '为特性[NotNull]加IsRequired()',
            replace: '\\[NotNull\\](.*?)\n(.*?);',
            replaceValue: '[NotNull]$1\n$2\.IsRequired\(\);',
          },
          {
            title: '为decimal类型的属性加长度限制',
            replace: '(\\(decimal??\\).*?\n.*?x\\.)(.*?)(\\).*?);',
            replaceValue: '$1$2$3\.HasPrecision\(18, 8\);',
          },
          {
            title: '为int类型的属性加长度限制',
            replace: '(\\(int??\\).*?\n.*?x\\.)(.*?)(\\).*?);',
            replaceValue: '$1$2$3\.HasMaxLength\();',
          },
          {
            title: '为string类型的属性加长度限制',
            replace: '(\\(string\\).*?);',
            replaceValue: '$1\.HasMaxLength\();',
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
      {
        title: "依赖注入_入参",
        previewBeforeConversion: "",
        previewAfterConversion: "",
        regularExpressions: [
          {
            title: '去掉缩进',
            replace: '\n\ {1,}',
            replaceValue: '\n',
          },
          {
            title: '去掉作用域',
            replace: '(private )|(protected )',
            replaceValue: '',
          },
          {
            title: '去掉readonly',
            replace: 'readonly ',
            replaceValue: '',
          },
          {
            title: '去掉下划线',
            replace: '_',
            replaceValue: '',
          },
          {
            title: '换成逗号',
            replace: ';',
            replaceValue: ',',
          },
        ]
      },
      {
        title: "依赖注入_赋值",
        previewBeforeConversion: "",
        previewAfterConversion: "",
        regularExpressions: [
          {
            title: '去掉缩进',
            replace: '\n\ {1,}',
            replaceValue: '\n',
          },
          {
            title: '去掉作用域',
            replace: '(private )|(protected )',
            replaceValue: '',
          },
          {
            title: '去掉readonly',
            replace: 'readonly ',
            replaceValue: '',
          },
          {
            title: '去掉类型',
            replace: 'I(.*?) ',
            replaceValue: '',
          },
          {
            title: '去掉下划线，转成赋值',
            replace: '_(.*?);',
            replaceValue: '_$1 = $1;',
          },
        ]
      },
      {
        title: "由Dto转构造赋值",
        previewBeforeConversion: "wegwege\nwqegweg",
        previewAfterConversion: "wegwegwe\negwegweg",
        regularExpressions: [
          {
            title: '去掉缩进',
            replace: '\n\ {1,}',
            replaceValue: '\n',
          },
          {
            title: "去除get set ",
            replace: " { get; set; }",
            replaceValue: "",
          },
          {
            title: "去除virtual ",
            replace: "virtual ",
            replaceValue: "",
          },
          {
            title: "///转为//",
            replace: "///",
            replaceValue: "//",
          },
          {
            title: "去除//<summary>",
            replace: "\n// <summary>",
            replaceValue: "",
          },
          {
            title: "去除\r\n//</summary>",
            replace: "\n// \</summary\>",
            replaceValue: "",
          },
          {
            title: "转换",
            replace: "public (.*?) (.*?)\n",
            replaceValue: "$2 = ___.$2,\n",
          },
        ]
      },
      {
        title: "由Dto转对象赋值",
        previewBeforeConversion: "wegwege\nwqegweg",
        previewAfterConversion: "wegwegwe\negwegweg",
        regularExpressions: [
          {
            title: '去掉缩进',
            replace: '\n\ {1,}',
            replaceValue: '\n',
          },
          {
            title: "去除get set ",
            replace: " { get; set; }",
            replaceValue: "",
          },
          {
            title: "去除virtual ",
            replace: "virtual ",
            replaceValue: "",
          },
          {
            title: "///转为//",
            replace: "///",
            replaceValue: "//",
          },
          {
            title: "去除//<summary>",
            replace: "\n// <summary>",
            replaceValue: "",
          },
          {
            title: "去除\r\n//</summary>",
            replace: "\n// \</summary\>",
            replaceValue: "",
          },
          {
            title: "转换",
            replace: "public (.*?) (.*?)\n",
            replaceValue: "___.$2 = ____.$2;\n",
          },
        ]
      },
      {
        title: "类定义转数据定义",
        previewBeforeConversion: "wegwege\nwqegweg",
        previewAfterConversion: "wegwegwe\negwegweg",
        regularExpressions: [
          {
            title: '去掉缩进',
            replace: '\n\ {1,}',
            replaceValue: '\n',
          },
          {
            title: "去除get set ",
            replace: " { get; set; }",
            replaceValue: "",
          },
          {
            title: "去除virtual ",
            replace: "virtual ",
            replaceValue: "",
          },
          {
            title: "/// 转为//",
            replace: "/// ",
            replaceValue: "//",
          },
          {
            title: "去除//<summary>",
            replace: "\n//<summary>",
            replaceValue: "",
          },
          {
            title: "去除\r\n//</summary>",
            replace: "\n//\</summary\>",
            replaceValue: "",
          },
          {
            title: "转换",
            replace: "\npublic (.*?) (.*?)\n",
            replaceValue: " $2\n",
          },
          {
            title: "转换成json",
            replace: "//(.*?) (.*?)\n",
            replaceValue: "{\n\t\"title\": \"$1\",\n\t\"column\": \"$2\",\n},\n",
          },
        ]
      },
      {
        title: "构造赋值转构造传参",
        previewBeforeConversion: "wegwege\nwqegweg",
        previewAfterConversion: "wegwegwe\negwegweg",
        regularExpressions: [
          {
            title: '去掉缩进',
            replace: '\n\ {1,}',
            replaceValue: '\n',
          },
          {
            title: "转换",
            replace: "\n(.*?) = (.*?);",
            replaceValue: "\ninput.$1,",
          },
        ]
      },
      {
        title: "参数定义简化",
        previewBeforeConversion: "wegwege\nwqegweg",
        previewAfterConversion: "wegwegwe\negwegweg",
        regularExpressions: [
          {
            title: '去掉缩进',
            replace: '\n\ {1,}',
            replaceValue: '\n',
          },
          {
            title: "去除get set ",
            replace: " { get; set; }",
            replaceValue: "",
          },
          {
            title: "去除virtual ",
            replace: "virtual ",
            replaceValue: "",
          },
          {
            title: "/// 转为//",
            replace: "/// ",
            replaceValue: "//",
          },
          {
            title: "去除//<summary>",
            replace: "\n//<summary>",
            replaceValue: "",
          },
          {
            title: "去除\r\n//</summary>",
            replace: "\n//\</summary\>",
            replaceValue: "",
          },
          {
            title: "转换",
            replace: "\npublic (.*?) (.*?)\n",
            replaceValue: " $2\n",
          },
          {
            title: "精简",
            replace: "//(.*?) (.*?)\n",
            replaceValue: "$1 $2\n",
          },
        ]
      },
      {
        title: "枚举转SQL的CASE",
        previewBeforeConversion: "wegwege\nwqegweg",
        previewAfterConversion: "wegwegwe\negwegweg",
        regularExpressions: [
          {
            title: '去掉缩进',
            replace: '\n\ {1,}',
            replaceValue: '\n',
          },
          {
            title: "去除注释",
            replace: "//.*\n",
            replaceValue: "",
          },
          {
            title: "转换",
            replace: "\\[Description\\(\"(.*?)\"\\)\\]\n.*? = (.*?),",
            replaceValue: "WHEN $2 THEN '$1'",
          },
        ]
      },
      {
        title: "MRP导入",
        previewBeforeConversion: "",
        previewAfterConversion: "",
        regularExpressions: [
          {
            title: '去掉金额',
            replace: '/[0-9]*\.[0-9]*\n',
            replaceValue: '\n',
          },
          {
            title: '去掉税率',
            replace: '/{0,1}[0-9]{0,3}%\n',
            replaceValue: '\n',
          },
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
