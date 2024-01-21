import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
// import styles from './index.module.scss'
import './index.module.scss'

const items = [
  {
    key: '1',
    label: 'Action 1',
  },
  {
    key: '2',
    label: 'Action 2',
  },
];
const App = () => {
  const expandedRowRender = () => {
    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Status',
        key: 'state',
        render: () => <Badge status="success" text="Finished" />,
      },
      {
        title: 'Upgrade Status',
        dataIndex: 'upgradeNum',
        key: 'upgradeNum',
      }
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  const columns = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: '',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: '',
      dataIndex: 'upgradeNum',
      key: 'upgradeNum',
    },
    {
      title: '',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '',
      dataIndex: 'createdAt',
      key: 'createdAt',
    }
  ];
  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: '',
      platform: '',
      version: '',
      upgradeNum: '',
      creator: '',
      createdAt: '',
    });
  }
  return (
    <>
      <Table
        className="custom-table"
        // className={styles['custom-table']}
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandAllRows: true
        }}
        dataSource={data}
      />
    </>
  );
};
export default App;