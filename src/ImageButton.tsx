import React from 'react';
import classnames from 'classnames';
import UploadPopup from './UploadPopup';

export interface ImageButtonProps {
  insertPicture: (url:string) => void;
}

export default class ImageButton extends React.Component<ImageButtonProps, any> {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }
  toggleVisible() {
    this.setState({
      visible: !this.state.visible,
    });
  }
  render() {
    const { visible } = this.state;
    const cls = classnames({
      ['editor-icon']: true,
      ['editor-icon-picture']: true
    });
    return <span onMouseDown={() => this.props.insertPicture('https://t.alipayobjects.com/images/T11rdgXbFkXXXXXXXX.png') } className={cls} />

  }
}
