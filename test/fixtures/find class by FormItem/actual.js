import React from 'react'
import { Form } from 'antd'
import { FormattedMessage } from 'react-intl';

const FormItem = Form.Item;

const element = (<div>
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
  <FormItem
    colon={false}
    label={<FormattedMessage {...messages.unitCost} />}
    {...label8Layout}
  >
    <Select />
  </FormItem>
  <FormItem {...label10Layout} label={formatMessage(Lang.requestNo)}>
    <Input />
  </FormItem>
</div>)
