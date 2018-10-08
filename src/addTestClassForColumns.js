import {
  isObjectProperty,
  isStringLiteral,
  isExpressionStatement,
  binaryExpression,
  stringLiteral,
  objectProperty
} from '@babel/types';
import { isColumnObjectExpression, getNeededNameFromNode, generateColTestClass } from './helpers';

export default function addTestClassForColumns(path, state, columnArrayExpression) { // eslint-disable-line
  columnArrayExpression.elements.forEach((item) => {
    const { isColumn, columnProperties } = isColumnObjectExpression(item)
    if (isColumn) {
      const classProperty = item.properties.find((innerItem) => {
        return isObjectProperty(innerItem) && getNeededNameFromNode(innerItem.key) === 'className'
      })
      const dataIndexValue = getNeededNameFromNode(columnProperties.dataIndex.value)
      if (classProperty && dataIndexValue) {
        if (isStringLiteral(classProperty.value)) {
          if (dataIndexValue) {
            classProperty.value = classProperty.value + ` ${generateColTestClass(dataIndexValue)}` // eslint-disable-line
          }
        }
        if (isExpressionStatement(classProperty.value)) {
          classProperty.value = binaryExpression('+', classProperty.value, stringLiteral(' ' + generateColTestClass(dataIndexValue)))
        }
      } else if (dataIndexValue) {
        item.properties.push(objectProperty('className', generateColTestClass(dataIndexValue)))
      }
    }
  })
}
