import babelPluginJsxSyntax from '@babel/plugin-syntax-jsx';
import { genMapByArr } from './helpers';
import needAddTestClassComponents from './needAddTestClassComponents';
import addTestClass from './addTestClass';

// TODO 需要看一下通过visitor.Program来判断一下这个文件是否有引入Form
// 以此来决定是否应该查找getFieldDecorator function里面的参数名称来自动生成test class。
// 其实可以限定向上查找的范围只能在render函数里面
export default function ({ types: t }) { // eslint-disable-line
  // plugin contents
  return {
    inherits: babelPluginJsxSyntax,
    visitor: {
      JSXElement(path, state) {
        const needAddTestClassMap = genMapByArr(needAddTestClassComponents);
        // check if need add test class
        const { attributes, name } = path.node.openingElement;
        // find data-test attribute
        const dataTestAttr = attributes.find((item) => {
          return item.name.name === 'data-test';
        });
        if (
          dataTestAttr
          && t.isJSXExpressionContainer(dataTestAttr.value)
          && !dataTestAttr.value.value
        ) return;
        // if match following condition add test class
        if (
          (dataTestAttr && t.isStringLiteral(dataTestAttr.value))
          || needAddTestClassMap[name.name]
        ) {
          addTestClass(
            path,
            state,
            path.node.openingElement,
            attributes,
            dataTestAttr
          );
        }
      },
      Program(path, state) { // eslint-disable-line
        // console.log(path, state);
      }
    }
  };
}
