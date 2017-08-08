import React, { Component } from 'react';

import FileInput from '../custom/fileInput';
import Textarea from '../custom/textarea';
import Result from '../result';
import diff from '../../libs/diff';
import './style.css';

export default class AppComponent extends Component {

  state = {
    isFileOpen: false,
    result: [],
  }

  compareTexts = () => {
    const result = diff(this.props.file1, this.props.file2);
    this.setState({ result });
  }

  toggleTab = () => {
    this.setState({ isFileOpen: !this.state.isFileOpen });
  }

  renderResult = () => {
    return this.state.result.length > 0 ? (
      <Result result={this.state.result} />
    ) : null
  }

  renderFileInfo = () => {
    if (this.state.isFileOpen) {
      return (
        <div className="texts-wrapper"> 
            <div className="file-wrapper">
              <FileInput
                fileName="file1"
              />
            </div>
            <div className="file-wrapper">
              <FileInput
                fileName="file2"
              />
            </div>
        </div>
      )
    }
  }

  disableButton = () => {
    if (this.props.file1.length === 0 || this.props.file2.length === 0) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="App">
        <div className="info-switcher">
          <div className="tab" onClick={this.toggleTab}>Upload from file</div>
        </div>

        { this.renderFileInfo() }

        <div className="texts-wrapper"> 
          <div className="textarea-wrapper">
            <Textarea
              textValue={this.props.file1}
              textareaName="file1"
              onChangeHandler={this.props.onChangeTextArea}
            />
          </div>
          <div className="textarea-wrapper">
            <Textarea
              textValue={this.props.file2}
              textareaName="file2"
              onChangeHandler={this.props.onChangeTextArea}
            />
          </div>
        </div>

        { this.renderResult() }

        <div className="compare-button-wrapper">
          <button className="compare" onClick={this.compareTexts} disabled={this.disableButton()}>Compare</button>
        </div>
      </div>
    );
  }
}
