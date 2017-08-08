import React from 'react';
import PropTypes from 'prop-types';

const Result = ({ result }) => (
    <div className="result-wrapper">
        <ul className="result-list">
          {
            result.map((item, index) =>
              <li className="result-item" key={ index } >
                <span className="number">{ item.id }</span>
                <span className="symbol">{ item.symbol }</span>
                <span className="text">{ item.text }</span>
              </li>
            )
          }
        </ul>
    </div>
);

export default Result;

Result.propTypes = {
    result: PropTypes.array.isRequired,
};