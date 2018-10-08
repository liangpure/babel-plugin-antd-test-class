import { Table } from 'antd'

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
const column = 'test';
const cols = function() {}
class MyTable extends React.Component {
  constructor() {
    super();
    this.columns = [{
      title: <span>fdd</span>,
      dataIndex: 'fdd',
      className: "col-autotest-fdd"
    }]
  }
}