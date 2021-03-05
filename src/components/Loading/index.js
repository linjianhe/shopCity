import React, { Component } from 'react';
import classNames from 'classnames';

import './index.less';


/**
 * 通用组
 * @param {*} props
 */
class Loading extends Component {
  static defaultProps = {
    visable: false,
    type: 'normal_type', // 1 含透明背景 2
    fixed: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      visable: this.props.visable,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.visable !== this.props.visable) {
      this.setState({
        visable: nextProps.visable,
      });
    }
  }

  render() {
    const { type = Loading.NORMAL_TYPE, fixed, } = this.props;
    const loadingClass = classNames('loading', type);
    let info = '';
    let style = {};
    if (type === Loading.VERTICAL_TYPE) {
      info = '加载中';
    } else if (type === Loading.HORIZONTAL_TYPE) {
      info = '加载中....';
    } else if (type === Loading.BG_TYPE) {
      info = '正在加载';
      style = fixed ? { position: 'fixed', } : {};
    }

    return (
      this.state.visable ?
        (
          <div className="loading-main">
            {
              type === Loading.BG_TYPE ? (<div className="loading-mask" style={style} />) : null
            }
            <div className={loadingClass} style={style}>

              <div className="loading-icon">
                <div className="loader" />
              </div>
              {

                (type === Loading.VERTICAL_TYPE ||
                  type === Loading.BG_TYPE ||
                  type === Loading.HORIZONTAL_TYPE) ?
                    <div className="text-info" >{info}</div> : null
              }
            </div>
          </div>
        ) : null
    );
  }
}
Loading.BG_TYPE = 'bg-type';
Loading.HORIZONTAL_TYPE = 'horizontal-type';
Loading.VERTICAL_TYPE = 'vertical_type';
Loading.NORMAL_TYPE = 'normal_type';
export default Loading;
