import { Form } from 'antd'

const FormItem = Form.Item;

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