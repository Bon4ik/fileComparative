import React from 'react';
import PropTypes from 'prop-types';

import './style.css'

const Textarea = ({ onChangeHandler, textValue, textareaName }) => (
  <div className="Textarea">
    <textarea
      className="textarea" 
      name={ textareaName } 
      id={ textareaName }
      onChange={ (e) => onChangeHandler({ name: textareaName, text: e.target.value }) }
      value={textValue}
    />
  </div>
)

export default Textarea;

Textarea.propTypes = {
  textValue: PropTypes.string.isRequired,
  textareaName: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};