import React, { useState } from 'react'
import { Modal, Input, Select, DatePicker, Tabs } from 'antd'
import styles from './EditableModal.scss'

const { TabPane } = Tabs;

const EditableModal = ({
  visible,
  onCancel,
  onSave,
  formItems,
  initialValues,
}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleSave = () => {
    onSave(formValues);
  };

  const handleFieldChange = (field, value) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };

  return (
    <Modal open={visible} onCancel={onCancel} onOk={handleSave} width={800}>
      <Tabs defaultActiveKey="1">
        {formItems.map((tab, tabIndex) => (
          <TabPane tab={tab.title} key={tabIndex + 1}>
            <div style={{height: '300px'}}>
              <div style={{display:'flex', flexWrap: 'wrap'}}>
                {tab.fields.map((field, fieldIndex) => (
                  <div 
                    key={`formItem-${tabIndex}-${fieldIndex}`}
                    style={{margin: '0 20px 20px 0'}}
                  >
                    <label htmlFor={field.name}>{field.label + '：'}</label>
                    {field.type === 'input1' && (
                      <Input
                        style={{ width: '400px' }}
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
                    {field.type === 'datePicker' && (
                      <DatePicker
                        name={field.name}
                        value={formValues[field.name]}
                        disabled={field.disabled}
                        onChange={date => handleFieldChange(field.name, date)}
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