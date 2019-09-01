import React from 'react';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import Rater from '../../src/containers/Rater';
import { loadBooks } from '../../src/actions/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store, books, wrapper, params;

describe('<Rater/> Component',() => {
    
    beforeEach(()=>{
        store = mockStore();
        store.dispatch(loadBooks());
        books = store.getActions()[0].payload;
        params = { 'params': {'title' : 'Html & CSS Design & Build website' } };
        wrapper = mount(
            <MemoryRouter>
                <Rater store={store} books={books} match={params} />
            </MemoryRouter>,
            { attachTo: document.getElementById('root') }
            );
    });

    it('renders <Rater/> with the given book title',()=>{     
        expect(wrapper).to.exist;
        expect(wrapper.text()).to.contains('Kindly rate this book.');
        expect(wrapper.find('#book-rating > .far')).to.have.length(5);
    });

    it('<Rater/> allows rating the book',()=>{
        wrapper.find('#book-rating > .far').at(1).simulate('click',{button:0});
        expect(wrapper.props().children.props.books)
        .to.deep.include({ 'title': 'Html & CSS Design & Build website', 'ratings': 2 });
    });

    afterEach(()=>{
        wrapper.detach();
    });

});