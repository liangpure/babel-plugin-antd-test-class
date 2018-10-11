# babel-plugin-antd-test-class

Add semantic test class eg. `className="Input-autotest-user"` for antd controlled component.

## Why babel-plugin-antd-test-class

Some antd component can't pass 'id' or 'data-*' props to real dom.
eg. `Table, DatePicker` etc.So we can't use these attribute for QC test.
And if add test class manually, It's annoying and will pollute source code.

## Example

### use `data-test` set test className

```javascript
<Input className="ant-input" data-test="custNo" />
<Select className={active ? 'active' : 'default'} data-test="user">...</Select>

    ↓ ↓ ↓ ↓ ↓ ↓

<Input className="ant-input Input-autotest-custNo" />
<Select className={(active ? 'active' : 'default') + " Select-autotest-user"}>...</Select>
```

### auto find sematic test name when use `FormItem` and `getFieldDecorator`

```javascript
<FormItem
  colon={false}
  label={<FormattedMessage {...messages.custPartNo} />}
  {...label8Layout}
>
  {
    getFieldDecorator('custPart')(
      <Input />
    )
  }
</FormItem>

    ↓ ↓ ↓ ↓ ↓ ↓

<FormItem
    colon={false}
    label={<FormattedMessage {...messages.custPartNo} />}
    {...label8Layout}
  >
    {
      getFieldDecorator('custPart')(
        <Input className="Input-autotest-custPart" />
      )
    }
  </FormItem>
```

### auto add test name for Table columns

```javascript
import { Table } from 'antd'

const columns = [{
  title: 'line',
  dataIndex: 'id'
}, {
  title: 'money',
  dataIndex: 'money',
  className: 'exist-class'
}, {
  title: 'condition',
  dataIndex: 'condition',
  className: isActive && 'active'
}]

    ↓ ↓ ↓ ↓ ↓ ↓

const columns = [{
  title: 'line',
  dataIndex: 'id',
  className: "col-autotest-id"
}, {
  title: 'money',
  dataIndex: 'money',
  className: "exist-class col-autotest-money"
}, {
  title: 'condition',
  dataIndex: 'condition',
  className: (isActive && 'active') + " col-autotest-condition"
}]
```