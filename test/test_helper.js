import _$ from 'jquery';
import {JSDOM} from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.navigator = global.window.navigator;
global.document = dom.window.document;
const $ = _$(window);

chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props = {}, state = {}) {
  const componentInstance =  ReactTestUtils.renderIntoDocument(
    <Provider store = {createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance));
}

$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

export {renderComponent, expect};