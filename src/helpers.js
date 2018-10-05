import {
  isIdentifier,
  isMemberExpression,
  isStringLiteral,
  isJSXElement,
  isJSXAttribute,
  isJSXSpreadAttribute
} from '@babel/types';

export function genMapByArr(arr) {
  const res = {};
  arr.forEach((keyItem) => {
    if (typeof keyItem === 'string') {
      res[keyItem] = keyItem;
    }
  });
  return res;
}

export function getReactIntlMessageName(node) {
  let res = ''
  if (isJSXElement(node)) {
    if (node.openingElement.name.name === 'FormattedMessage') {
      node.openingElement.attributes.find((attribute) => {
        if (isJSXAttribute(attribute) && attribute.name.name === 'id') {
          if (isStringLiteral(attribute.value)) {
            res = attribute.value.value
            return true;
          }
        }
        if (isJSXSpreadAttribute(attribute)) {
          if (isMemberExpression(attribute.argument)) {
            if (isIdentifier(attribute.argument.property)) {
              res = attribute.argument.property.name
              return true;
            }
          }
        }
        return false
      })
    }
  }
  return res;
}

// get needed string name from node
export function getNeededNameFromNode(node) {
  if (isMemberExpression(node)) {
    if (isIdentifier(node.property)) {
      return node.property.name
    }
  }
  if (isIdentifier(node)) {
    return node.name
  }
  if (isStringLiteral(node)) {
    return node.value
  }
  if (isJSXElement(node)) {
    return getReactIntlMessageName(node)
  }
  return ''
}
