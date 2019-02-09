import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdCheckCircle, MdError, MdWarning } from 'react-icons/md';

import InputStyleWrapper from './Input.style';

class Input extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    helpText: PropTypes.string,
    status: PropTypes.string, // 'error', 'success', 'warning'
    hasFeedback: PropTypes.bool,
    // eslint-disable-next-line
    leftIcon: PropTypes.object,
    // eslint-disable-next-line
    rightIcon: PropTypes.object,
    className: PropTypes.string,
    width: PropTypes.string
  };

  static defaultProps = {
    width: 'auto',
    onFocus: null,
    onBlur: null,
    type: 'text',
    placeholder: '',
    helpText: null,
    status: null,
    leftIcon: null,
    rightIcon: null,
    hasFeedback: false,
    className: null
  };

  state = {
    focus: false
  };

  focus = e => {
    const { onFocus } = this.props;
    this.setState({ focus: true });
    if (onFocus) onFocus(e);
  }

  blur = e => {
    const { onBlur } = this.props;
    this.setState({ focus: false });
    if (onBlur) onBlur(e);
  }

  render() {
    const {
      name, onChange, onFocus, onBlur,
      type, value, leftIcon, rightIcon,
      helpText, status, placeholder,
      focus, className, width
    } = this.props;

    let statusIcon;
    switch(status) {
      case 'success': {
        statusIcon = <MdCheckCircle/>;
        break;
      }
      case 'warning': {
        statusIcon = <MdWarning/>;
        break;
      }
      case 'error': {
        statusIcon = <MdError/>;
        break;
      }
      default: statusIcon = null;
    }


    return (
      <InputStyleWrapper width={width} className={className} focus={focus} status={status}>
        <div className="input-wrapper">
          { leftIcon }
          <input
            className="input-input"
            name={name} type={type}
            value={value} placeholder={placeholder}
            onChange={onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
          { statusIcon }
        </div>
        <div
          className={[
            "input-helper-text",
            helpText ? "input-helper-text-shown" :
            "input-helper-text-hidden"
          ].join(' ')}
        >
          {helpText}
        </div>
      </InputStyleWrapper>
    );
  }
}

export default Input;