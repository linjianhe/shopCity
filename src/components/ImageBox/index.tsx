import React, { Component } from 'react'
import './index.less'
import { Button, Modal } from 'antd'
import UploadModal from './UploadModal'

class ImageBox extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModalFlag: false,
      showImgFlag: false,
    };
  }

  handleShowUploadModal = () => {
    this.setState({ showModalFlag: true });
  };

  handleHideUploadModal = () => {
    this.setState({ showModalFlag: false });
  };

  handleShowImgModal = (src: any) => {
    if (src) {
      this.setState({ showImgFlag: true });
    }
  };

  handleHideImgModal = () => {
    this.setState({ showImgFlag: false });
  };

  handleReLoadSrc = (re: any) => {
    const { onReLoadSrc, onChange } = this.props;
    if (onReLoadSrc) {
      onReLoadSrc(re);
    }

    if (onChange) {
      onChange(re.src);
    }
  };

  render() {
    const {
      title,
      width,
      height,
      upload,
      src: imgSrc,
      picType,
      picName,
      required,
      isQualified,
      reason,
      value,
      renderUpload,
      renderImgInfo,
    } = this.props;
    const src = value || imgSrc;
    const titleStyles = {
      width: width || '280px',
    };
    const wrapperStyles = {
      width: width || '280px',
      height: height || '210px',
    };
    let imgWrapperClass = '';
    if (src) {
      imgWrapperClass = 'img-wrapper';
    } else {
      imgWrapperClass = 'img-wrapper bg';
    }
    let imgFooter;
    if (isQualified === true) {
      imgFooter = (
        <div className="img-footer">
          <span>合格</span>
        </div>
      );
    } else if (isQualified === false) {
      imgFooter = (
        <div className="img-footer">
          <span className="red-font">不合格</span>
          {reason ? `（${reason}）` : ''}
        </div>
      );
    }
    return (
      <div className="img-box">
        {renderUpload ? (
          <span onClick={this.handleShowUploadModal}>{renderUpload()}</span>
        ) : (
          <div className="img-title" style={titleStyles}>
            <span className={required ? 'img-title-span' : ''}>{title}：</span>
            {upload ? (
              <Button onClick={this.handleShowUploadModal}>上传</Button>
            ) : (
              ''
            )}
          </div>
        )}
        {renderImgInfo ? (
          <span onClick={this.handleShowImgModal.bind(this, src)}>
            {renderImgInfo(src)}
          </span>
        ) : (
          <div className="img-block-wrapper" style={wrapperStyles}>
            <div
              className={imgWrapperClass}
              onClick={this.handleShowImgModal.bind(this, src)}
            >
              <img src={src} alt="" />
            </div>
          </div>
        )}
        {imgFooter}
        <Modal
          title="上传文件"
          destroyOnClose
          visible={this.state.showModalFlag}
          footer={null}
          onCancel={this.handleHideUploadModal}
          style={{ paddingTop: '10%' }}
        >
          <UploadModal
            picType={picType}
            picName={picName}
            src={src}
            isShow={this.state.showModalFlag}
            onReLoadSrc={this.handleReLoadSrc}
            onSuccess={this.handleHideUploadModal}
          />
        </Modal>
        <Modal
          destroyOnClose
          visible={this.state.showImgFlag}
          footer={null}
          onCancel={this.handleHideImgModal}
          style={{ paddingTop: '5%' }}
          className="popup-img-modal"
        >
          <div className="popup-img-wrapper">
            <img src={src} alt="" />
          </div>
        </Modal>
      </div>
    );
  }
}
export default ImageBox
