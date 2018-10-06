import { transformSync } from '@babel/core';
import babelPluginJsxSyntax from '@babel/plugin-syntax-jsx';

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
                const labelAttr = path.node.openingElement.attributes.find(attribute => {
                  if (t.isJSXAttribute(attribute)) {
                    return attribute.name.name === 'label'
                  }
                })
                console.log('labelAttr labelAttr', t.isJSXElement(labelAttr.value.expression), labelAttr.value.expression)
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

const actual = transformSync(`
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
console.log('actual actual actual', actual.code)
