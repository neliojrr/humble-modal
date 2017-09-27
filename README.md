# humble-modal
[![npm version](https://img.shields.io/npm/v/humble-modal.svg?style=flat-square)](https://www.npmjs.com/package/humble-modal)

A React simple, humble and easy to use modal. No fancy props or behaviors.

## Instalation

NPM:

`npm install --save-dev humble-modal`


## Usage
~~~jsx
import Modal from 'humble-modal';

render() {
  return(
    <Modal show={this.state.show} onRequestClose={this.closeModal}>
      <span>Content inside the modal</span>
    </Modal>
  );
}
~~~


## API
- `show`: true or false. -- <i>is required</i>
- `onRequestClose`: function requested for the Modal to close itself. 
It happens when click on the close button (`x`), out of the modal or type ESC. 
-- <i>is required</i>
- `title`: Title of the Modal. Default: `null`
- `height`: Height of the Modal. Accepts any CSS statements. E.g.: `140px`, `3em`
- `width`: Width of the Modal. Accepts any CSS statements. E.g.: `140px`, `3em`
- `contentAlign`: Align of the content inside the Modal. E.g.: `right`, `left`.
Default `center`.
- `titleAlign`: Align of the title of the Modal. E.g.: `right`, `left`.
Default `center`.

## Full Example
~~~jsx
import React, { Component } from 'react';
import Modal from 'humble-modal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    }
  }

  openModal(e) {
    e.preventDefault();
    this.setState({ show: true });
  }

  onRequestClose(e) {
    e.preventDefault();
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <p>
          <button onClick={this.openModal.bind(this)}>Open Modal</button>
        </p>
        <Modal
          show={this.state.show}
          onRequestClose={this.onRequestClose.bind(this)}
          title="This is a humble modal"
          titleAlign="left"
          contentAlign="left"
        >
          <div>Testing this simple modal</div>
        </Modal>
      </div>
    );
  }
}

export default App;
~~~

## Contribution
Please, create an issue and pull request.
