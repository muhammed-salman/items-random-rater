import _$ from 'jquery';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import reducers from '../src/reducers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

configure({ adapter: new Adapter() });
global.expect = expect;
global.mount = mount;
global.render = render;
global.shallow = shallow;
const $ = _$(window);

function renderComponent(ComponentClass, props = {}, state = {}) {
  const componentInstance =  ReactTestUtils.renderIntoDocument(
    <Provider store = {createStore(reducers, state)}>
      <MemoryRouter>
        <ComponentClass {...props} />
      </MemoryRouter>
    </Provider>
  );
  console.log('helper',componentInstance);
  return $(ReactDOM.findDOMNode(componentInstance));
}

export {renderComponent, mockStore};