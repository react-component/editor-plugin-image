import classnames from 'classnames';
import React from 'react';
import { EditorState, Entity, Modifier } from 'draft-js';
import Image from './EditorPluginImage';

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
      const entityKey = Entity.create('image', 'IMMUTABLE', { url });
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
      }],
      component: (props) => {
        const cls = classnames({
          ['editor-icon']: true,
          ['editor-icon-picture']: true
        });

        return <span onMouseDown={() => insertPicture('https://t.alipayobjects.com/images/T11rdgXbFkXXXXXXXX.png') } className={cls} />
      },
    };
  },
  config: {},
}
