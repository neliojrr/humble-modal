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

    const background = this.props.backgroundStyle || defaultStyles.background;
    const modalWindowStyle = this.props.modalWindowStyle || defaultStyles.modalDialog;
    const headerStyle = this.props.headerStyle || defaultStyles.header;
    const titleStyle = this.props.titleStyle || defaultStyles.modalTitle;
    const contentStyle = this.props.contentStyle || defaultStyles.content;
    const noHeader = this.props.noHeader || false;

    return(
      <div
        id="backgroundModal"
        className="closeModal"
        onClick={ this.onRequestClose.bind(this) }
        style={{ ...background, display: newDisplay }}
      >
        <div style={ modalWindowStyle }>
          <div style={{ ...headerStyle, display: this.props.noHeader ? "none" : "" }}>
            <button
              onMouseEnter={ this.hoverCloseButton.bind(this) }
              onMouseLeave={ this.hoverCloseButton.bind(this) }
              onClick={ this.onRequestClose.bind(this) }
              style={{ ...defaultStyles.buttonClose, opacity: newOpacity }}
              type="button"
              className="closeModal"
            >
              <span className="closeModal">x</span>
            </button>
            <h3
              style={ titleStyle }
            >
              {this.props.title}
            </h3>
          </div>
          <div
            style={ contentStyle }
          >
            { this.props.children }
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
  titleStyle: PropTypes.object,
  backgroundStyle: PropTypes.object,
  modalWindowStyle: PropTypes.object,
  headerStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  noHeader: PropTypes.bool
};

Modal.defaultProps = {
  title: "",
  noHeader: false
};

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
    width: "50vw",
  },
  header: {
    position: "relative",
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
    border: "15px solid white",
    height: "50vh",
    overflowY: "auto",
    borderRadius: "4px"
  }
}
