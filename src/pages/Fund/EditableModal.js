import React, { useState, useEffect } from 'react'
import { Modal, Input, Select, TimePicker, DatePicker, Tabs } from 'antd'
import dayjs from 'dayjs'
import styles from './EditableModal.scss'

const { TabPane } = Tabs;

const EditableModal = ({
  visible,
  onCancel,
  onSave,
  formItems,
  initialValues,
}) => {
  const [formValues, setFormValues] = useState(initialValues)
  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues])

  const handleSave = () => {
    // 将时间和日期选择器的值格式化为指定格式
    // const formattedValues = {
    //   ...formValues,
    //   time: formValues.time ? dayjs(formValues.time).format('HH:mm:ss') : null,
    //   date: formValues.date ? dayjs(formValues.date).format('YYYY-MM-DD') : null
    // }
    // onSave(formattedValues)

    onSave(formValues)
  };

  const handleFieldChange = (field, value) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };

  return (
    <Modal closable={false} open={visible} onCancel={onCancel} onOk={handleSave} width={640}>
      <Tabs defaultActiveKey="1">
        {formItems.map((tab, tabIndex) => (
          <TabPane tab={tab.title} key={tabIndex + 1}>
            <div style={{height: '300px'}}>
              <div style={{display:'flex', flexWrap: 'wrap'}}>
                {tab.fields.map((field, fieldIndex) => (
                  <div 
                    key={`formItem-${tabIndex}-${fieldIndex}`}
                    style={{margin: '0 0px 20px 0',display: 'flex', alignItems: 'center'}}
                  >
                    <div style={{ width: '90px', textAlign: 'right' }}>{field.label + '：'}</div>
                    {/* <label htmlFor={field.name} style={{ width: '50px' }}>{field.label + '：'}</label> */}
                    {field.type === 'input1' && (
                      <Input
                        style={{ width: '490px' }}
                        name={field.name}
                        value={formValues[field.name]}
                        disabled={field.disabled}
                        onChange={e => handleFieldChange(field.name, e.target.value)}
                      />
                    )}
                    {field.type === 'input' && (
                      <Input
                        style={{ width: '200px' }}
                        name={field.name}
                        value={formValues[field.name]}
                        disabled={field.disabled}
                        onChange={e => handleFieldChange(field.name, e.target.value)}
                      />
                    )}
                    {field.type === 'select' && (
                      <Select
                        style={{ width: '200px' }}
                        name={field.name}
                        value={formValues[field.name]}
                        disabled={field.disabled}
                        onChange={value => handleFieldChange(field.name, value)}
                      >
                        {field.options.map(option => (
                          <Select.Option key={option.value} value={option.value}>
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                    {field.type === 'timePicker' && (
                      <TimePicker
                        style={{ width: '200px' }}
                        name={field.name}
                        value={formValues[field.name] ? dayjs(formValues[field.name], 'HH:mm:ss') : null}
                        disabled={field.disabled}
                        onChange={date => handleFieldChange(field.name, date ? date.format('HH:mm:ss') : null)}
                      />
                    )}
                    {field.type === 'datePicker' && (
                      <DatePicker
                        style={{ width: '200px' }}
                        format="YYYY-MM-DD"
                        name={field.name}
                        value={formValues[field.name] ? dayjs(formValues[field.name], 'YYYY-MM-DD') : null}
                        disabled={field.disabled}
                        onChange={date => handleFieldChange(field.name, date ? date.format('YYYY-MM-DD') : null)}
                      />
                    )}
                    {/* 可以根据需要添加其他类型的表单项 */}
                  </div>
                ))}
              </div>
            </div>
          </TabPane>
        ))}
      </Tabs>
    </Modal>
  );
};

export default EditableModal;