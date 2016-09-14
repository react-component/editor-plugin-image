import classnames from 'classnames';
import React from 'react';
import 'react-resizable/css/styles.css';
import Trigger from 'rc-trigger';
import { EditorState, Entity, Modifier } from 'draft-js';
import Image from './EditorPluginImage';
import ImageLoader from './EditorPluginImageLoader';
import UploadPopup from './UploadPopup';
import ImageButton from './ImageButton';
import exportImage from './exportImage';

function findWithRegex(regex, contentBlock, callback) {
  // Get the text from the contentBlock
  const text = contentBlock.getText();
  let matchArr;
  let start; // eslint-disable-line
  // Go through all matches in the text and return the indizes to the callback
  while ((matchArr = regex.exec(text)) !== null) { // eslint-disable-line
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

function noop() {};

export default {
  constructor() {
    const callbacks = {
      getEditorState: noop,
      setEditorState: noop,
    };

    function insertPicture(url) {
      const entityKey = Entity.create('image-loader', 'IMMUTABLE', { url, export: exportImage });
      const editorState = callbacks.getEditorState();
      const selection = editorState.getSelection();

      const insertPictureContent = Modifier.replaceText(
        editorState.getCurrentContent(),
        selection,
          url,
        null,
        entityKey
      );

      const InsertSpaceContent = Modifier.insertText(
        insertPictureContent,
        insertPictureContent.getSelectionAfter(),
        ' ',
      );

      const newEditorState = EditorState.push(editorState, InsertSpaceContent, 'insert-mention');
      callbacks.setEditorState(
        EditorState.forceSelection(newEditorState, InsertSpaceContent.getSelectionAfter())
      );
    }

    const uploadPopup = (<div>
      <input type="text"/>

    </div>);

    return {
      name: 'image',
      callbacks,
      decorators: [{
        strategy (contentBlock, callback) {
          contentBlock.findEntityRanges(character => {
          const entityKey = character.getEntity();
          return entityKey && Entity.get(entityKey).getType() === 'image';
          }, callback);
        },
        component: (props) => <Image {...props} />
      }, {
        strategy (contentBlock, callback) {
          contentBlock.findEntityRanges(character => {
          const entityKey = character.getEntity();
          return entityKey && Entity.get(entityKey).getType() === 'image-loader';
          }, callback);
        },
        component: (props) => <ImageLoader {...props} callbacks={callbacks} />
      }],
      component: (props) => <ImageButton insertPicture={insertPicture} />
    };
  },
  config: {},
}
