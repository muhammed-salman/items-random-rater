import React from 'react';
import { MemoryRouter, Link } from 'react-router-dom';
import ItemList from '../../src/components/ItemList';
import RandomRater from '../../src/containers/RandomRater';
import { loadBooks } from '../../src/actions/index';
import { mockStore } from '../test_helper';

let store, books, wrapper, params;
const orgBooks = [
    {"title": "Html & CSS Design & Build website","ratings": 5},
    {"title": "Database System Concepts","ratings": 4},
    {"title": "Software Testing","ratings": 4},
    {"title": "Fundamentals of Database System","ratings": 2},
    {"title": "Javascript & Jquery","ratings": 4},
    {"title": "Python Crash Course","ratings": 3},
    {"title": "Automate Boring Stuff with Python","ratings": 1},    
    {"title": "Design Patterns","ratings": 3},
    {"title": "Data Mining Concepts","ratings": 5}
];

describe('<RandomRater/> Component',() => {
    
    before(()=>{
        store = mockStore();
        store.dispatch(loadBooks());
        books = store.getActions()[0].payload;
        params = { 'params': {'title' : 'Html & CSS Design & Build website' } };
    });

    it('renders <RandomRater/> containing <ItemList/> and <Link/>',()=>{     
        wrapper = mount(
                    <MemoryRouter>
                        <RandomRater store={store} books={books} match={params} />
                    </MemoryRouter>,
                    { attachTo: document.getElementById('root') }
                    );
        expect(wrapper).to.exist;
        expect(wrapper.contains(ItemList)).to.equal(true);
        expect(wrapper.contains(Link)).to.equal(true);
        expect(wrapper.text()).to.contains('Start Random Rating');
        expect(wrapper.text()).to.contains('Back');
    });

    it('<RandomRater/> random rates the books',()=>{
        wrapper.find('#btn-random-rate').simulate('click',{button:0});
        setTimeout(()=>{ 
            expect(orgBooks).to.be.not.deep.equal(wrapper.props().children.props.books);
        },200);   
    });
    
    after(()=>{
       wrapper.detach(); 
    });
});