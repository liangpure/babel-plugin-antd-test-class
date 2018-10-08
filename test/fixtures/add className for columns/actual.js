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
const column = 'test';
const cols = function() {}
class MyTable extends React.Component {
  constructor() {
    super();
    this.columns = [{
      title: <span>fdd</span>,
      dataIndex: 'fdd'
    }]
  }
}