import * as React from 'react';
import classnames from 'classnames';
import { Entity } from 'draft-js';
import { Resizable } from 'react-resizable';

class EditorPluginImage extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0,
      url: null,
      loaded: false,
      focus: false,
    };
  }

  componentWillMount() {
    const { entityKey } = this.props;
    const entity = Entity.get(entityKey);
    const url = entity.getData().url;
    const image = new Image();
    image.onload = () => {
      const { width, height } = image;
      this.setState({
        width,
        height,
        url,
        loaded: true
      });
    }
    image.src = url;
  }
  onResize = (event, {element, size}) => {
    this.setState({width: size.width, height: size.height});
  };
  onMouseDown = () => {
    this.setState({
      focus: true,
    });
  }
  render() {
    const { width, height, loaded, url, focus } = this.state;
    const imageStyle = {
      width,
      height,
      backgroundImage: `url(${url})`,
      backgroundSize: '100% 100%',
      lineHeight: `${height}px`,
      letterSpacing: width,
      verticalAlign: 'bottom',
      display: 'inline-block'
    };

    const cls = classnames({
      [`resizable-image`]: true,
      ['focus']: focus,
    });

    if (loaded) {
      return (<Resizable width={width} height={height} onResize={this.onResize}>
        <span
          className={cls}
          contentEditable={false}
          onMouseDown={this.onMouseDown}
          style={imageStyle}
       />
      </Resizable>);
    }
    return <span >loading...</span>
  };
}

export default EditorPluginImage;
