import React from 'react';
import { MemoryRouter, Route, Link } from 'react-router-dom';
import App from '../../src/components/App';
import ItemList from '../../src/components/ItemList';
import RandomRater from '../../src/containers/RandomRater';
import { loadBooks } from '../../src/actions/index';
import { mockStore } from '../test_helper';

let store, books, wrapper;

describe('<App/> Component',() => {
    
    before(()=>{
        store = mockStore();
        store.dispatch(loadBooks());
        books = store.getActions()[0].payload;
    });

    it('renders <App /> containing <ItemList/>, <Link/> and button',()=>{     
        wrapper = mount(
                    <MemoryRouter>
                        <Route path="/randomrater" render={()=><RandomRater store={store} books={books} />} />
                        <App store={store} books={books} />
                    </MemoryRouter>
                    );
        expect(wrapper).to.exist;
        expect(wrapper.contains(ItemList)).to.equal(true);
        expect(wrapper.contains(Link)).to.equal(true);
        expect(wrapper.text()).to.contains('Go to Random Rater');
    });

    it('<App/> component provides navigation to <RandomRater/>',() => {
        expect(wrapper.find('a#random-rater-link')).to.have.length(1);
        wrapper.find('a#random-rater-link').simulate('click',{ button: 0 });
        expect(wrapper.find('#btn-random-rate')).to.have.length(1);
    });
});