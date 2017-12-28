import React, { Component } from "react";
import PropTypes from 'prop-types';

const ESC_KEY = 27;

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      show: false,
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  handleKeyDown(event) {
    switch(event.keyCode) {
      case ESC_KEY:
        this.props.onRequestClose(event);
        break;
      default:
        break;
    }
  }

  onRequestClose(event) {
    if(event.target.className === "closeModal") {
      this.props.onRequestClose(event);
    }
  }

  hoverCloseButton(e) {
    e.stopPropagation();
    this.setState({ hover: !this.state.hover });
  }

  render() {
    let newOpacity = 0.2;
    if(this.state.hover) {
      newOpacity = 1
    }

    let newDisplay = "none";
    if(this.props.show) {
      newDisplay = "flex";
    }

    return(
      <div
        id="backgroundModal"
        className="closeModal"
        onClick={this.onRequestClose.bind(this)}
        style={{...defaultStyles.background, display: newDisplay}}
      >
        <div style={defaultStyles.modalDialog}>
          <div style={{...defaultStyles.header, textAlign: this.props.titleAlign}}>
            <button
              onMouseEnter={this.hoverCloseButton.bind(this)}
              onMouseLeave={this.hoverCloseButton.bind(this)}
              onClick={this.onRequestClose.bind(this)}
              style={{...defaultStyles.buttonClose, opacity: newOpacity}}
              type="button"
              className="closeModal"
            >
              <span className="closeModal">x</span>
            </button>
            <h3
              style={this.props.titleStyle || defaultStyles.ModalTitle}
            >
              {this.props.title}
            </h3>
          </div>
          <div
            style={{
              ...defaultStyles.content,
              width: this.props.width,
              height: this.props.height,
              textAlign: this.props.contentAlign
            }}
            className="modalContent"
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  contentAlign: PropTypes.string,
  titleAlign: PropTypes.string
}

const defaultStyles = {
  background: {
    position: "fixed",
    top: 0,
    left: 0,
    background: "rgba(64, 64, 64, 0.5)",
    zIndex: 3000,
    height: "100%",
    width: "100%",
  },
  modalDialog: {
    position: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    margin: "auto",
    minHeight: "10px",
    maxHeight: "85vh",
    borderRadius: "4px",
    zIndex: 4000,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
    overflowY: "auto"
  },
  header: {
    minHeight: "16.43px",
    paddingLeft: "15px",
    paddingRight: "15px",
    borderBottom: "1px solid #e5e5e5"
  },
  buttonClose: {
    float: "right",
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: 1,
    textShadow: "0 1px 0 #fff",
    border: 0,
    background: 0,
    cursor: "pointer"
  },
  modalTitle: {
    margin: 0,
    lineHeight: "1.4",
    fontSize: "16px",
    fontWeight: "600",
  },
  content: {
    position: "relative",
    padding: "15px"
  }
}
