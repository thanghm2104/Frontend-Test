declare module 'react-draft-wysiwyg' {
  import * as React from 'react';
  import { EditorState } from 'draft-js';

  export interface EditorProps {
    editorState: EditorState;
    onEditorStateChange?: (editorState: EditorState) => void;
    onChange?: (editorState: EditorState) => void;
    toolbar?: any;
    toolbarClassName?: string;
    wrapperClassName?: string;
    editorClassName?: string;
    [key: string]: any;
  }

  export class Editor extends React.Component<EditorProps> {}
} 