/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {
  binaryExpression,
  Identifier,
  isJSXExpressionContainer,
  isStringLiteral,
  jSXAttribute,
  JSXAttribute,
  jSXExpressionContainer,
  jSXIdentifier,
  stringLiteral,
  parenthesizedExpression,
  isJSXAttribute,
  isJSXIdentifier
} from '@babel/types';
// https://babeljs.io/docs/en/babel-types#logicalexpression
import generateTestClass from './generateTestClass'

export default function addTestClass(
  path,
  state,
  openingElement,
  attributes,
  dataTestAttr
) {
  let classNameAttr = attributes.find((attribute) => {
    if (isJSXAttribute(attribute) && isJSXIdentifier(attribute.name)) {
      return attribute.name.name === 'className'
    }
    return false
  })
  const testClassName = generateTestClass(
    path,
    state,
    openingElement,
    attributes,
    dataTestAttr,
    classNameAttr
  )
  if (classNameAttr && testClassName) {
    if (isStringLiteral(classNameAttr.value)) {
      classNameAttr.value.value = `${classNameAttr.value.value} ${testClassName}`;
    }
    if (isJSXExpressionContainer(classNameAttr.value)) {
      const { expression } = classNameAttr.value
      // add test class name for expression
      classNameAttr.value.expression = binaryExpression('+', classNameAttr.value.expression, stringLiteral(' ' + testClassName))
    }
  } else if (testClassName) {
    // create class attribute
    attributes.push(jSXAttribute(jSXIdentifier('className'), stringLiteral(testClassName)))
  }
}
/*
  JSXAttribute(path) {
        if (path.node.name.name === 'className') {
          if (t.isJSXExpressionContainer(path.node.value)) {
            path.node.value.expression = t.binaryExpression('+', path.node.value.expression, t.stringLiteral(' testClassName'))
          }
        }
      }
      */
