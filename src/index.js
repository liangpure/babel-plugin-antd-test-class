import babelPluginJsxSyntax from '@babel/plugin-syntax-jsx';
import { genMapByArr, isImportedX, isColumnsNeedAddClassName } from './helpers';
import needAddTestClassComponents from './needAddTestClassComponents';
import addTestClass from './addTestClass';
import deleteDataTestAttr from './deleteDataTestAttr'
import addTestClassForColumns from './addTestClassForColumns'


export default function ({ types: t }) { // eslint-disable-line
  // plugin contents
  return {
    inherits: babelPluginJsxSyntax,
    visitor: {
      JSXElement(path, state) {
        const needAddTestClassMap = genMapByArr(needAddTestClassComponents);
        // check if need add test class
        const { attributes, name } = path.node.openingElement;
        // console.log(state.get('thisFileHasImportForm'))
        // find data-test attribute
        const dataTestAttr = attributes.find((item) => {
          return t.isJSXAttribute(item) && item.name.name === 'data-test';
        });
        if (
          dataTestAttr
          && t.isJSXExpressionContainer(dataTestAttr.value)
          && !dataTestAttr.value.value
        ) {
          deleteDataTestAttr(dataTestAttr, attributes);
          return;
        }
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
          deleteDataTestAttr(dataTestAttr, attributes)
        }
      },
      AssignmentExpression(path, state) { // eslint-disable-line
        if (!state.get('thisFileHasImportTable')) return;
        const leftNode = path.node.left;
        const rightNode = path.node.right;
        let identifierName; // eslint-disable-line
        if (t.isMemberExpression(leftNode) && t.isIdentifier(leftNode.property)) {
          identifierName = leftNode.property.name
        }
        if (isColumnsNeedAddClassName(identifierName, rightNode)) {
          addTestClassForColumns(path, state, rightNode)
        }
      },
      VariableDeclarator(path, state) {
        if (!state.get('thisFileHasImportTable')) return;
        let identifierName;
        if (t.isIdentifier(path.node.id)) {
          identifierName = path.node.id.name
        }
        if (isColumnsNeedAddClassName(identifierName, path.node.init)) {
          addTestClassForColumns(path, state, path.node.init)
        }
      },
      Program(path, state) { // eslint-disable-line
        // console.log(path, state);
        state.set('thisFileHasImportForm', isImportedX(path, 'Form'));
        state.set('thisFileHasImportTable', isImportedX(path, 'Table'));
      }
    }
  };
}
