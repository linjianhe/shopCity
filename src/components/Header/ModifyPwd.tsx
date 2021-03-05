import React from 'react'
import { Form, Row, Col, Input, Button, message } from 'antd'

const FormItem = Form.Item

export interface IModifyForm {
  onSubmit: Function,
  loading: boolean
}

function ModifyForm({onSubmit, loading} : IModifyForm) {
  const [form] = Form.useForm()
  const { getFieldValue } = form

  const handleSubmit = (values: any) => {
    const npass = getFieldValue('npass')
    const rpass = getFieldValue('rpass')
    if (npass !== rpass) {
      message.info('两次输入的密码不一样')
      return
    }
    onSubmit(values)
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 9 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
  }

  return (
    <Form form={form} onFinish={handleSubmit}>
      <FormItem 
        name="spass"
        rules={[
          {
            required: true,
            whitespace: true,
            message: '原始密码不能为空',
          }
        ]}
        label="原始密码"
        {...formItemLayout}
      >
        <Input
          placeholder="请输入原始密码"
          type="password"
          maxLength={18}
        />
      </FormItem>
      <FormItem
        name="npass"
        label="新密码"
        {...formItemLayout}
        rules={[
          {
            required: true,
            whitespace: true,
            message: '新密码不能为空',
          }
        ]}
      >
        <Input placeholder="请输入新密码" type="password" maxLength={18} />
      </FormItem>
      <FormItem
        name="rpass"
        label="确认密码"
        {...formItemLayout}
        rules={[
          {
            required: true,
            whitespace: true,
            message: '确认密码不能为空',
          }
        ]}
      >
        <Input
          placeholder="请输入确认密码"
          type="password"
          maxLength={18}
        />
      </FormItem>
      <Row>
        <Col span={24}>
          <FormItem style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '100px' }}
            >
              确定
            </Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
}

export default React.memo(ModifyForm)
