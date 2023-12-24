import React, { useState } from 'react';
import { Table, Button } from 'antd';
import EditableModal from './EditableModal';

const dataSource = [
  { name: '小米', sex: '男', city: '北京', age: 25, time: '12:42:12', date: '1998-03-28' },
  { name: '小名', sex: '女', city: '深圳', age: 22, time: '02:42:12', date: '1997-03-28' },
  { name: '小古', sex: '男', city: '广州', age: 28, time: '06:30:00', date: '1996-03-28' },
];

const App = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '性别', dataIndex: 'sex', key: 'sex' },
    { title: '城市', dataIndex: 'city', key: 'city' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '出生时间', dataIndex: 'time', key: 'time' },
    { title: '出生年月日', dataIndex: 'date', key: 'date' },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleEdit(record)}>编辑</Button>
      ),
    },
  ];

  // 编辑按钮点击处理函数
  const handleEdit = record => {
    console.log('编辑', record)
    setSelectedRow(record)
    setModalVisible(true)
  }

  // 保存按钮点击处理函数
  const handleSave = values => {
    console.log('Form values:', values)
    setModalVisible(false)
  }

  // 表单配置
  const formItems = [
    {
      title: '基本信息',
      fields: [
        {
          label: '姓名',
          name: 'name',
          type: 'input1',
          fullWidth: true,
          disabled: true,
          rules: [{ required: true, message: '请输入姓名' }],
        },
        {
          label: '性别',
          name: 'gender',
          type: 'select',
          options: [
            { label: '男', value: '男' },
            { label: '女', value: '女' },
          ],
          disabled: false,
          rules: [{ required: true, message: '请选择性别' }],
        },
        {
          label: '城市',
          name: 'city',
          type: 'input',
          disabled: false,
          rules: [{ required: true, message: '请输入城市' }],
        },
        {
          label: '出生时间',
          name: 'time',
          type: 'timePicker',
          disabled: false,
          rules: [{ required: true, message: '请选择出生时间' }],
        },
        {
          label: '出生年月日',
          name: 'date',
          type: 'datePicker',
          disabled: false,
          rules: [{ required: true, message: '出生年月日' }],
        }
      ],
    },
    {
      title: '其他信息',
      fields: [
        {
          label: '年龄',
          name: 'age',
          type: 'input',
          disabled: false,
          rules: [{ required: true, message: '请输入年龄' }],
        },
      ],
    },
  ]

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
      {selectedRow && (
        <EditableModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onSave={handleSave}
          formItems={formItems}
          initialValues={selectedRow}
        />
      )}
    </div>
  );
};

export default App;