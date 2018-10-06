import {
  isIdentifier,
  isCallExpression,
  isJSXAttribute,
  isStringLiteral,
  isJSXExpressionContainer,
  isJSXElement
} from '@babel/types';
import { TEST_SYMBOL } from './constant'
import { getNeededNameFromNode } from './helpers';

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
          // when use preset-react@7.0, the <FormattedMessage /> has been transformed to function,
          // It's not right.
          // https://astexplorer.net/#/gist/d8ef99d64d0596a81878d0ba0696a38b/d63d527e29f163fe1f8a154720e5742dcff22c2a
          // work right in the astexpolorer
          if (isJSXElement(labelAttr.value.expression)) {
            return getNeededNameFromNode(labelAttr.value.expression)
          }
          if (isCallExpression(labelAttr.value.expression)) {
            if (isIdentifier(labelAttr.value.expression.callee)) {
              if (labelAttr.value.expression.callee.name === 'formatMessage') {
                return getNeededNameFromNode(labelAttr.value.expression.arguments[0])
              }
            }
          }
        }
      }
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
