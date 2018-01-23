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


## Props
|Prop|Type|Required|Default|
|----|----|--------|-------|
|show|boolean|true|        |
|onRequestClose|function|true|  |
|title|string|false|""|
|noHeader|boolean|false|false|
|titleStyle|object|false|  |
|backgroundStyle|object|false|  |
|modalWindowStyle|object|false|  |
|headerStyle|object|false|  |
|contentStyle|object|false|  |


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
