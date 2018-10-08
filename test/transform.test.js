import { transformSync } from '@babel/core';
import babelPluginJsxSyntax from '@babel/plugin-syntax-jsx';

let isJSXElement;
const plugin = function (babel) {
  const { types: t } = babel;
  return {
    inherits: babelPluginJsxSyntax,
    visitor: {
      JSXElement(path) {
        if (path.node.openingElement.name.name === 'TestAAA') {
          path.findParent((path) => { // eslint-disable-line
            // console.log(path);
            if (path.isJSXElement()) {
              if (path.node.openingElement.name.name === 'FormItem') {
                const labelAttr = path.node.openingElement.attributes.find(attribute => { // eslint-disable-line
                  if (t.isJSXAttribute(attribute)) {
                    return attribute.name.name === 'label'
                  }
                })
                isJSXElement = t.isJSXElement(labelAttr.value.expression);
                // console.log('labelAttr labelAttr',
                // t.isJSXElement(labelAttr.value.expression), labelAttr.value.expression)
                return true;
              }
              return false
            }
            return false
          })
        }
      }
    }
  };
}

transformSync(`
const test = (
  <FormItem
   colon={false}
   label={<FormattedMessage {...messages.custPartNo} />}
  >
   <TestAAA />
  </FormItem>
)
`, {
  plugins: [plugin, '@babel/plugin-transform-react-jsx']
})
test('babel transform work right, expect labelAttr.value.expression is JSXElement', () => {
  // this maybe is plugin-transform-react-jsx bug.
  expect(!isJSXElement).toBe(true)
})
