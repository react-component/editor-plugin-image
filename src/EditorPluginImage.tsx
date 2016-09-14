import * as React from 'react';
import classnames from 'classnames';
import { Entity } from 'draft-js';
import { Resizable } from 'react-resizable';

class EditorPluginImage extends React.Component<any, any> {
  constructor() {
    super();
  }

  onResize = (event, {element, size}) => {
    this.setState({width: size.width, height: size.height});
    const { entityKey } = this.props;
    Entity.mergeData(entityKey, { width: size.width, height: size.height });
  };
  onMouseDown = () => {
    this.setState({
      focus: true,
    });
  }
  render() {
    const { entityKey } = this.props;
    const entityData = Entity.get(entityKey).getData();

    const { width, height, image } = entityData;
    const imageStyle = {
      width,
      height,
      backgroundImage: `url(${image.src})`,
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

    return (<Resizable width={width} height={height} onResize={this.onResize}>
      <span
        className={cls}
        contentEditable={false}
        onMouseDown={this.onMouseDown}
        style={imageStyle}
     />
    </Resizable>);
  };
}

export default EditorPluginImage;
