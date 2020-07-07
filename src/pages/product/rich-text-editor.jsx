import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {EditorState, convertToRaw,ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


class RichTextEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    }

    static propTypes={
        detail:PropTypes.string
    }

    constructor(props) {
        super(props);
        const html = this.props.detail;
        if (html){
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.state = {
                    editorState,
                };
            }
        } else {
            this.state = {
                editorState:EditorState.createEmpty()
            };
        }

    }
    /**
     * 输入过程中实时的回调
     * @param editorState
     */
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    getDetail = () => {
        const {editorState} = this.state;

        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }

    render() {
        const {editorState} = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    editorStyle={{border: '1px solid gray', minHeight: 200}}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}

export default RichTextEditor;