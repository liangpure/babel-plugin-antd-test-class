import {
  isIdentifier,
  isCallExpression,
  isJSXAttribute,
  isStringLiteral,
  isJSXExpressionContainer,
  isJSXText,
  isJSXElement
} from '@babel/types';
import { TEST_SYMBOL } from './constant'
import { getReactIntlMessageName, getNeededNameFromNode } from './helpers';

function getSmeanticName(
  path,
  state,
  openingElement,
  attributes,
  dataTestAttr
) {
  // const elementName = openingElement.name.name
  if (dataTestAttr && dataTestAttr.value.value) {
    return dataTestAttr.value.value
  }
  // find name attribute
  const nameAttr = attributes.find((attribute) => {
    return isJSXAttribute(attribute) && attribute.name.name === 'name'
  })
  if (nameAttr && isStringLiteral(nameAttr.value)) {
    return nameAttr.value.value
  }
  // get test class by getFieldDecorator
  if (state.get('thisFileHasImportForm')) {
    // search closet getFieldDecorator first param
    let getFieldDecoratorNode;
    // let notFindNeededNode;
    let FormItemOpeningElementNode;
    path.findParent((_path) => {
      if (_path.isCallExpression()) {
        if (isCallExpression(_path.node.callee)) {
          if (isIdentifier(_path.node.callee.callee)) {
            if (_path.node.callee.callee.name === 'getFieldDecorator') {
              getFieldDecoratorNode = _path.node;
              return true;
            }
          }
        }
      }
      if (_path.isJSXElement()) {
        if (_path.node.openingElement.name.name === 'FormItem') {
          FormItemOpeningElementNode = _path.node.openingElement;
          return true;
        }
      }
      if (_path.isClassMethod() || _path.isFunctionDeclaration() || _path.isVariableDeclaration()) {
        return true
      }
      return false
    })
    if (getFieldDecoratorNode) {
      return getNeededNameFromNode(getFieldDecoratorNode.callee.arguments[0])
    }
    if (FormItemOpeningElementNode) {
      const labelAttr = FormItemOpeningElementNode.attributes.find((attribute) => {
        if (isJSXAttribute(attribute)) {
          return attribute.name.name === 'label'
        }
        return false
      })
      if (labelAttr) {
        if (isStringLiteral(labelAttr.value)) {
          return labelAttr.value.value
        }
        if (isJSXExpressionContainer(labelAttr.value)) {
          return getReactIntlMessageName(labelAttr.value.expression)
        }
      }
    }
  }
  // if element is Button, find its children
  if (openingElement.name.name === 'Button') {
    if (isJSXExpressionContainer(path.node.children[0])) {
      const res = getReactIntlMessageName(path.node.children[0].expression);
      if (res) return res;
    }
    if (isJSXText(path.node.children[0])) {
      return path.node.children[0].value
    }
    if (isJSXElement(path.node.children[0])) {
      const res = getReactIntlMessageName(path.node.children[0]);
      if (res) return res;
    }
  }
  return ''
}

export default function generateTestClass(path, state, openingElement, ...rest) {
  const semanticName = getSmeanticName(path, state, openingElement, ...rest);
  const elementName = openingElement.name.name
  if (semanticName) {
    return `${elementName}-${TEST_SYMBOL}-${semanticName}`
  }
  return ''
}
