import { TEST_SYMBOL } from './constant'

export default function generateTestClass(
  path,
  state,
  openingElement,
  attributes,
  dataTestAttr,
  classNameAttr
) {
  const elementName = openingElement.name.name
  if (dataTestAttr && dataTestAttr.value.value) {
    return `${elementName}-${TEST_SYMBOL}-${dataTestAttr.value.value}`
  }
  // get test class by getFieldDecorator
  
  return ''
}
