import React from 'react';
import Dialog from 'rc-dialog';

export default function UploadPopup(props) {
  return (<Dialog title="上传图片" visible={props.visible} onClose={props.onClose}>
      <input type="text" />
    </Dialog>);
}
