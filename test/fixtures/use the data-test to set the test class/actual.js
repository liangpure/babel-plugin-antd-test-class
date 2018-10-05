<div>
  <Input className="ant-input" data-test="custNo" />
  <Select data-test="warehouse" />
  <Button className={loading ? 'loading' : 'default'} data-test="query">query</Button>
  <InputNumber className={disabled && disabled} data-test="number" />
</div>
