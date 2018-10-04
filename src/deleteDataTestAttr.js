export default function deleteDataTestAttr(dataTestAttr, attributes) {
  if (dataTestAttr) {
    attributes.splice(attributes.indexOf(dataTestAttr), 1)
  }
}
