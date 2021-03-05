import React, {useEffect} from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, RadarChartOutlined, LockOutlined } from '@ant-design/icons'

const FormItem = Form.Item

interface ILoginForm {
  onLogin: Function,
  loading: boolean
}
function NormalLoginForm({onLogin, loading}: ILoginForm) {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    if (onLogin) {
      onLogin(values)
    }else {
      handleVCodeClick()
    }
  }

  const handleVCodeClick = () => {
    const el: any = document.getElementById('verifyCodeImg')
    if (el) {
      // el.src = `/api/getYzmImage?${Date.now()}`
      el.src = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAAtCAIAAAAMbPOFAAAO5klEQVR42u3bebhVYxsG8FOGyBgVoShjUYa4lFnoIzJPRYYMRcYyTxUVlUYzZYiUg5KSuBR1KLPkNJkzy1SUUHzf79rPZV3r2zt1fJ1Ofcd+/zjXaq+13vW+93M/93M/a+8K/p0fK2IU5CHI457HPT/yuOdxz4887nnc8+P/APfff//93XffXbRo0Wefffbdd9+V4rRx8NZbb82fP9/BvHnzXnrppX867r/88svs2bOfeeaZCRMmXHPNNYMGDWrfvv3UqVN9OH369GUHPXA3f8+ePUHftWvX1157De7du3cfOXLk119/PWfOnIULF/7222//INxt+80337z44ov333//mjVr1qtXr06dOrVq1erSpUvv3r3vvvvuuOyPzIiDv4s7iB977DE3FhUVgd6zmjRpAvQLLrjgwAMP7N+///XXX//999+PGzfuyy+/LP+4Q2TatGmFhYUnnXTSJptsUqVKlYoVK1aoUKGgoGDjjTfefffdQT9jxoz0LRB88cUXP//88+Li4p9++mny5MnC5nPS9Ouvv/qb+5Q33nhD8K644gqTb7vttq1atTrmmGO22GKLnXba6YADDvDQNm3aWEC7du06dep02223lXPc8evHH388//zzjz322KpVq6611lpwgbiD1VdfHQ1r1KgxduxYQH/xxRfB8auvvrpDhw7kghYdffTRp5566uTMwGX1wIQLM4NcpHNCMJ566qkTTjjh0Ucf3XrrrT3C8eabb+6gWrVqlStXdrD22ms7HjZsmFR47733yjPuDz/8MFjRbZ111sHxYDrWH3nkkbJ+yJAhI0aMUAOnTJny1Vdfwe7aa689/PDD3bLVVlutt956cHfqkEMO8SEuP//8808//bTy8MMPP2SxfsyYMdgdQMeoW7fugAEDpBRlE4lVVlmlevXqFnD55ZeT/kig8ok7iRg1ahT4KmQGLI466ij7R9Xhw4dj67fffpu+fubMmZJAMWzZsqXLgA7rVVddFVjNmjXr27fvwQcfDERC8eSTT6KtFIkbKVLz5s3d4hHxrA022KB+/frjx493pQM1XLA9TjbAXcyEsHzivmDBAjWNgCSgCwCt2GijjRgbSH3yySfJxWJAQABNZI444gjXE6LtttvOxUBfc8018d2HG264IWm+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`
    }
  }
  useEffect(() => {

  },[])
  return (
    <Form form={form} onFinish={handleSubmit} className="login-form" initialValues={{vcode: 'f85e'}}>
      <FormItem
        name="userName"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        {(
          <Input
            className="login-input"
            size="large"
            prefix={<UserOutlined />}
            placeholder="请输入您的用户名"
            maxLength={30}
          />
        )}
      </FormItem>
      <FormItem
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        {(
          <Input
            className="login-input"
            size="large"
            prefix={<LockOutlined />}
            type="password"
            placeholder="请输入您的密码"
            maxLength={30}
          />
        )}
      </FormItem>
      <FormItem style={{position: 'relative'}}>
        <FormItem 
          name="vcode"
          rules={[{ required: true, message: '请输入验证码!' }]}
        >
          <Input
            className="login-input"
            size="large"
            prefix={<RadarChartOutlined />}
            placeholder="请输入验证码"
            maxLength={4}
          />
        </FormItem>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAAtCAIAAAAMbPOFAAAO5klEQVR42u3bebhVYxsG8FOGyBgVoShjUYa4lFnoIzJPRYYMRcYyTxUVlUYzZYiUg5KSuBR1KLPkNJkzy1SUUHzf79rPZV3r2zt1fJ1Ofcd+/zjXaq+13vW+93M/93M/a+8K/p0fK2IU5CHI457HPT/yuOdxz4887nnc8+P/APfff//93XffXbRo0Wefffbdd9+V4rRx8NZbb82fP9/BvHnzXnrppX867r/88svs2bOfeeaZCRMmXHPNNYMGDWrfvv3UqVN9OH369GUHPXA3f8+ePUHftWvX1157De7du3cfOXLk119/PWfOnIULF/7222//INxt+80337z44ov333//mjVr1qtXr06dOrVq1erSpUvv3r3vvvvuuOyPzIiDv4s7iB977DE3FhUVgd6zmjRpAvQLLrjgwAMP7N+///XXX//999+PGzfuyy+/LP+4Q2TatGmFhYUnnXTSJptsUqVKlYoVK1aoUKGgoGDjjTfefffdQT9jxoz0LRB88cUXP//88+Li4p9++mny5MnC5nPS9Ouvv/qb+5Q33nhD8K644gqTb7vttq1atTrmmGO22GKLnXba6YADDvDQNm3aWEC7du06dep02223lXPc8evHH388//zzjz322KpVq6611lpwgbiD1VdfHQ1r1KgxduxYQH/xxRfB8auvvrpDhw7kghYdffTRp5566uTMwGX1wIQLM4NcpHNCMJ566qkTTjjh0Ucf3XrrrT3C8eabb+6gWrVqlStXdrD22ms7HjZsmFR47733yjPuDz/8MFjRbZ111sHxYDrWH3nkkbJ+yJAhI0aMUAOnTJny1Vdfwe7aa689/PDD3bLVVlutt956cHfqkEMO8SEuP//8808//bTy8MMPP2SxfsyYMdgdQMeoW7fugAEDpBRlE4lVVlmlevXqFnD55ZeT/kig8ok7iRg1ahT4KmQGLI466ij7R9Xhw4dj67fffpu+fubMmZJAMWzZsqXLgA7rVVddFVjNmjXr27fvwQcfDERC8eSTT6KtFIkbKVLz5s3d4hHxrA022KB+/frjx493pQM1XLA9TjbAXcyEsHzivmDBAjWNgCSgCwCt2GijjRgbSH3yySfJxWJAQABNZI444gjXE6LtttvOxUBfc8018d2HG264IWm+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"
            style={{
              position: 'absolute',
              width: '100px',
              right: '0',
              zIndex: 9,
              top: '2px'
            }}
            alt="图片验证码"
            id="verifyCodeImg"
            onClick={handleVCodeClick}
          />
      </FormItem>
      
      <FormItem>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
          block
        >
          登录
        </Button>
      </FormItem>
    </Form>
  )
}

export default NormalLoginForm
