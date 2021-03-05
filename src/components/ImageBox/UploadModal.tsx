import React, { Component } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import { refreshPicUrl } from '../../api';

const FormItem = Form.Item;
/**
 * 图片轮询操作
 * @param {object} params
 * @returns {Promise<{msg: string; status: number; imageUrl: string}>}
 */
async function loadImage(id: any) {
  const re = {
    msg: '上传失败',
    status: 0,
    imageUrl: '',
  };
  const picUrl: any = await load(id);
  if (picUrl) {
    re.msg = '上传成功';
    re.status = 1;
    re.imageUrl = picUrl;
  }
  return re;
}
/**
 * 轮询图片地址
 * @param id
 * @returns {Promise<any>}
 */
async function load(id: any) {
  let picUrl: any = '';
  let loadCount = 0;
  let uploadStatus = 0;
  while (loadCount < 30 && uploadStatus !== 2) {
    const refreshRes: any = await refreshPicUrl({ picUid: id });
    if (refreshRes && refreshRes.status === 0) {
      const uploadRe = refreshRes.re;
      uploadStatus = uploadRe.uploadStatus;
      if (uploadStatus === 1) {
        loadCount += 1;
      } else if (uploadStatus === 2) {
        picUrl = uploadRe.picUrl;
      } else if (uploadStatus === 3) {
        loadCount = 30;
      }
    }
    await sleep(1000);
  }
  return picUrl;
}

/**
 * 代码休眠
 * @param time
 */
function sleep(time: any) {
  return new Promise(resolve => setTimeout(resolve, time));
}

class UploadModal extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      uploader: null,
      uploadLoading: false,
      fileName: '',
      uploadResult: null, // 1 成功， 0 失败
    };
  }

  componentDidMount() {
    const { src, picType, picName } = this.props;
    const conf = {
      src,
      picType,
      picName,
    };
    const uploader = this.initUploader();
    this.setState({ uploader });
  }

  componentWillReceiveProps(nextProps: any) {
    if (!nextProps.isShow) {
      this.setState({ uploadResult: null, uploadLoading: false, fileName: '' });
    }
  }

  componentWillUnmount() {
    const uploader = this.state.uploader;
    if (uploader) {
      uploader.destroy();
    }
  }

  initUploader = () => {
    const btnId = `selectBtn${this.props.picType}`;
    const uploader = new plupload.Uploader({
      runtimes: 'html5,flash',
      browse_button: btnId,
      multi_selection: false,
      max_file_size: '3mb',
      url: '/api/imageUpload.do',
      multipart_params: {
        // 接口所需参数
        picType: this.props.picType,
        oldPicUrl: this.props.src,
      },
      flash_swf_url: '/upload/Moxie.swf',
      // 文件类型限制
      filters: [{ title: 'Image files', extensions: 'jpg,gif,png,jpeg' }],
    });
    uploader.bind('FilesAdded', (up: any, files: any) => {
      if (files && files.length > 0) {
        this.setState({ fileName: files[0].name, uploadResult: null });
      }
    });
    uploader.bind('Error', () => {
      this.setState({ uploadResult: 0 });
    });
    uploader.bind('FileUploaded', (up: any, file: any, result: any) => {
      const status = result.status;
      const data = $.parseJSON(result.response);
      if (status === 200 && data.status === 0) {
        const picUid = data.re.picUid;
        loadImage(picUid).then((res: any) => {
          if (res && res.status === 1) {
            const re = {
              picType: this.props.picType,
              picName: this.props.picName,
              src: res.imageUrl,
            };
            this.handleReLoadSrc(re);
            this.setState({ uploadResult: 1, fileName: '' });
            const { onSuccess } = this.props;
            if (onSuccess) {
              onSuccess();
            }
          } else {
            this.setState({ uploadResult: 0, fileName: '' });
          }
          this.setState({ uploadLoading: false });
        });
      } else {
        this.setState({ uploadResult: 0, uploadLoading: false, fileName: '' });
      }
    });
    uploader.init();
    return uploader;
  };

  handleReLoadSrc = (re: any) => {
    const { onReLoadSrc } = this.props;
    if (onReLoadSrc) {
      onReLoadSrc(re);
    }
  };

  handleUpload = () => {
    const { picType } = this.props;
    const iptId = `#fileInput${picType}`;
    const filename = $(iptId).val();
    if (filename) {
      this.setState({ uploadLoading: true });
      const uploader = this.state.uploader;
      uploader.start();
    } else {
      this.setState({ uploadResult: 2, uploadLoading: false });
    }
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const { picType } = this.props;
    const btnId = `selectBtn${picType}`;
    const iptId = `fileInput${picType}`;

    return (
      <div>
        <Row gutter={24}>
          <Col span={18}>
            <FormItem {...formItemLayout} label="图片">
              <Input id={iptId} value={this.state.fileName} readOnly />
            </FormItem>
          </Col>
          <Col span={6} style={{ paddingLeft: '0' }}>
            <FormItem>
              <button
                id={btnId}
                className="select-btn"
                disabled={this.state.uploadLoading}
              >
                选择
              </button>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <div className="upload-btn-div">
              <Button
                type="primary"
                className="upload-btn"
                loading={this.state.uploadLoading}
                onClick={this.handleUpload}
              >
                上传
              </Button>
              {this.state.uploadResult === 1 ? (
                <span className="upload-status">上传成功</span>
              ) : this.state.uploadResult === 0 ? (
                <span className="upload-status fail">上传失败</span>
              ) : this.state.uploadResult === 2 ? (
                <span className="upload-status fail">请选择图片</span>
              ) : (
                ''
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default UploadModal;
