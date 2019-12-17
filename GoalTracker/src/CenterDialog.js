import React, { Component } from 'react';
import './CenterDialog.css';

class CenterDialog extends Component {
  render() {
    return (
      <div className="CenterDialog">
        {this.props.children}
      </div>
    );
  }
}

export default CenterDialog;

