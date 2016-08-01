// use jsx to render html, do not modify simple.html

import 'rc-editor-core/assets/index.css';
import 'react-resizable/css/styles.css';
import Image from 'rc-editor-plugin-image';
import { EditorCore, Toolbar, GetHTML } from 'rc-editor-core';
import React from 'react';
import ReactDOM from 'react-dom';
import { Entity } from 'draft-js';

const plugins = [Image];
const toolbars = [['image']];


const EditorWithPreview = React.createClass({
  getInitialState() {
    return {
      html: '',
    };
  },
  editorChange(editorState) {
    this.setState({
      html: GetHTML(editorState),
    });
  },
  render() {
    return (<div>
      <div className="preview" dangerouslySetInnerHTML={{__html: this.state.html}}></div>
    <EditorCore
    plugins={plugins}
    toolbars={toolbars}
    placeholder="input text here"
    onChange={this.editorChange}
  />
  </div>);
  }
});
ReactDOM.render(<EditorWithPreview />, document.getElementById('__react-content'));
