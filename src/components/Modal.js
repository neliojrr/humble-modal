import React, { Component } from "react";
import PropTypes from 'prop-types';

const ESC_KEY = 27;

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      show: false,
      title: "",
      height: null,
      width: null
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }

  componentDidMount() {
    const show = this.props.show || false;
    const title = this.props.title || "";
    const width = this.props.width || null;
    const height = this.props.height || null;
    this.setState({
      show,
      title,
      width,
      height
    });
  }

  componentWillReceiveProps(nextProps) {
    const show = nextProps.show || false;
    const title = nextProps.title || "";
    const width = nextProps.width || null;
    const height = nextProps.height || null;
    this.setState({
      show,
      title,
      width,
      height
    });
  }

  handleKeyDown(event) {
    switch(event.keyCode) {
      case ESC_KEY:
        this.props.onRequestClose();
        break;
      default:
        break;
    }
  }

  onRequestClose(e) {
    this.props.onRequestClose(e);
  }

  hoverCloseButton(e) {
    e.stopPropagation();
    this.setState({ hover: !this.state.hover });
  }

  render() {
    if(this.state.hover) {
      defaultStyles.buttonClose.opacity = 1;
    }
    else {
      defaultStyles.buttonClose.opacity = 0.2;
    }

    if(this.state.show) {
      defaultStyles.background.display = "flex";
    }
    else {
      defaultStyles.background.display = "none";
    }

    if(this.state.width) {
      defaultStyles.content.width = this.state.width;
    }

    if(this.state.height) {
      defaultStyles.content.height = this.state.height;
    }

    return(
      <div
        id="backgroundModal"
        className="closeModal"
        onClick={this.onRequestClose.bind(this)}
        style={defaultStyles.background}
      >
        <div style={defaultStyles.modalDialog}>
          <div style={defaultStyles.header}>
            <button
              onMouseEnter={this.hoverCloseButton.bind(this)}
              onMouseLeave={this.hoverCloseButton.bind(this)}
              onClick={this.onRequestClose.bind(this)}
              style={defaultStyles.buttonClose}
              type="button"
              className="closeModal"
            >
              <span className="closeModal">x</span>
            </button>
            <h3 style={defaultStyles.ModalTitle}>{this.state.title}</h3>
          </div>
          <div
            style={defaultStyles.content}
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
  width: PropTypes.string
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
    padding: "15px",
    borderBottom: "1px solid #e5e5e5"
  },
  buttonClose: {
    float: "right",
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: 1,
    textShadow: "0 1px 0 #fff",
    opacity: .2,
    border: 0,
    background: 0
  },
  modalTitle: {
    margin: 0,
    lineHeight: "1.4",
    fontSize: "16px",
    fontWeight: "600"
  },
  content: {
    position: "relative",
    padding: "15px",
  }
}
