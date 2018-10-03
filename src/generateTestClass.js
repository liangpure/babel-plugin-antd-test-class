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
    attributes.splice(attributes.indexOf(dataTestAttr), 1)
    return `${elementName}-${TEST_SYMBOL}-${dataTestAttr.value.value}`
  }
  return ''
}
