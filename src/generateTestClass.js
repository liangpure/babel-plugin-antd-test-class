import { TEST_SYMBOL } from './constant'

export function generateTestClass(
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
}
