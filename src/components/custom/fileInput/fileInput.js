import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default class FileInput extends Component {

    state = {
        error: '',
    }

    renderError = () => {
        if (this.state.error) {
            return <span className="error">{ this.state.error }</span>
        }
    }

    handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file.name.slice(-4) === '.txt') {
            this.setState({ error: '' });

            this.props.uploadFile({
                file,
                name: 'File',
                id: this.props.fileName,
            });
        } else {
            this.setState({ error: 'U can upload just a .txt file' })
        }
    }

    render() {
        const { fileName } = this.props;
        return (
            <div className="FileInput">
                
                { this.renderError() }

                <input
                    type="file"
                    className="file-input"
                    accept="text/plain"
                    name={ fileName } 
                    id={ fileName }
                    onChange={ this.handleFileUpload }
                />
            </div>
      )
    }
}

FileInput.propTypes = {
  fileName: PropTypes.string.isRequired,
};