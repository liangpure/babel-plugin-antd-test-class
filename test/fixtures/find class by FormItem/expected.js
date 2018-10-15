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
        <Input className="Input-autotest-custPart" />
      )
    }
  </FormItem>
  <FormItem
    colon={false}
    label={<FormattedMessage {...messages.unitCost} />}
    {...label8Layout}
  >
    <Select className="Select-autotest-unitCost" />
  </FormItem>
  <FormItem {...label10Layout} label={formatMessage(Lang.requestNo)}>
    <Input className="Input-autotest-requestNo" />
  </FormItem>
  <FormItem
    colon={false}
    label={<FormattedMessage {...messages.revSkuNo} />}
    {...label8Layout}
  >
    {
      getFieldDecorator(formFieldMap.revSkuNo)(
        <Input className="Input-autotest-revSkuNo" />
      )
    }
  </FormItem>
</div>)