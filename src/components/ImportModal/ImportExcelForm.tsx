import React, { useState, useMemo, useEffect } from 'react';
import { Input, Button, Row, Col, Form, message, Modal } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { FormComponentProps } from 'antd/lib/form';
import htmr from 'htmr';

interface IImportExcelFormProps extends FormComponentProps {
  onSubmit?: (values?: any) => void;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  uploadType: string;
  templateUrl: string;
  templateTitle: string;
  uploadUrl: string;
}

function ImportExcelForm(props: IImportExcelFormProps) {
  const {
    onSubmit,
    onCancel,
    form,
    uploadType,
    uploadUrl,
    templateTitle,
    templateUrl,
  } = props;
  const [uploadLoading, setUploadLoading] = useState(false);
  const btnId = `select-file-btn-${uploadType}`;
  const iptId = `#file-input-${uploadType}`;

  const [pluploadUploader, setPluploadUploader]: any = useState({});

  useEffect(() => {
    setPluploadUploader(initUploader);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getFieldDecorator, setFieldsValue } = form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  function initUploader() {
    const uploader = new plupload.Uploader({
      runtimes: 'html5,flash',
      browse_button: btnId,
      multi_selection: false,
      max_file_size: '3mb',
      url: uploadUrl,
      multipart_params: {},
      flash_swf_url: '/upload/Moxie.swf',
      // 文件类型限制
      filters: [{ title: 'Excel File', extensions: 'xls,xlsx' }],
    });
    uploader.bind('FilesAdded', (_: any, files: any) => {
      if (files && files.length > 0) {
        setFieldsValue({ file: files[0].name });
      }
    });
    uploader.bind('Error', (_: any, error: any) => {
      message.error(error.message || '上传失败, 请稍后再试');
      setFieldsValue({ file: '' });
    });
    uploader.bind('UploadComplete', () => {
      setUploadLoading(false);
    });
    uploader.bind('FileUploaded', (_up: any, _file: any, result: any) => {
      const status = result.status;
      const data = $.parseJSON(result.response);
      if (status === 200 && data.status === 0) {
        if (onSubmit) onSubmit();
      } else {
        let msg = '';
        if (data.re) {
          let errList = data.re || [];
          if (typeof errList === 'string') {
            errList = [data.re];
          }
          errList.forEach((item: any) => {
            if (typeof item === 'string') {
              msg += `<p>${item}</p>`;
            }
          });
        }
        Modal.info({
          title: '导入失败',
          content: msg ? htmr(msg) : data.msg,
        });
        setFieldsValue({ file: '' });
      }
    });
    uploader.init();
    return uploader;
  }

  function handleSubmit() {
    props.form.validateFields((errors, _) => {
      if (!errors) {
        handleUpload();
      }
    });
  }

  function handleCancel(e: any) {
    if (onCancel) {
      onCancel(e);
    }
  }

  function handleUpload() {
    setUploadLoading(true);
    pluploadUploader.start();
  }

  function handleTemplateClick() {
    window.location.href = templateUrl;
  }

  return (
    <Form>
      <Row gutter={12}>
        <Col span={14}>
          <FormItem label="选择文件" {...formItemLayout}>
            {getFieldDecorator('file', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请选择文件',
                },
              ],
            })(<Input readOnly id={iptId} />)}
          </FormItem>
        </Col>
        <Col span={3}>
          <Button
            type="primary"
            style={{ marginTop: '5px' }}
            id={btnId}
            disabled={uploadLoading}
          >
            {' '}
            浏览
          </Button>
        </Col>
        <Col span={6}>
          <Button
            type="link"
            onClick={handleTemplateClick}
            style={{ marginTop: '5px', padding: 0 }}
          >
            {' '}
            {templateTitle}
          </Button>
        </Col>
      </Row>
      <div className="button-footer">
        <Button
          type="primary"
          className="button-width-10"
          onClick={handleSubmit}
          loading={uploadLoading}
        >
          上传
        </Button>
        <Button className="button-width-10" onClick={handleCancel}>
          取消
        </Button>
      </div>
    </Form>
  );
}

export default Form.create<IImportExcelFormProps>()(ImportExcelForm);
