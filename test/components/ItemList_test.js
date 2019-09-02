import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import ItemList from '../../src/components/ItemList';
import Rater from '../../src/containers/Rater';
import { loadBooks } from '../../src/actions/index';
import { mockStore } from '../test_helper';

let store, books, wrapper, params;

describe('<ItemList/> Component',() => {
    
    before(()=>{
        store = mockStore();
        store.dispatch(loadBooks());
        books = store.getActions()[0].payload;
        params = { 'params': {'title' : 'Html & CSS Design & Build website' } };
    });

    it('renders <ItemList/> with a table of books list (10 items)',()=>{     
        wrapper = mount(
                    <MemoryRouter>
                        <Route path="/rater/:title" render={()=><Rater store={store} books={books} match={params}/>} />
                        <ItemList books={books} randomRaterList={false} />
                    </MemoryRouter>
                    );
        expect(wrapper).to.exist;
        expect(wrapper.find('table')).to.have.length(1);
        expect(wrapper.find('tr')).to.have.length(10);
        expect(wrapper.find('th')).to.have.length(3);
        expect(wrapper.find('th').at(0).text()).to.equal('Title');
        expect(wrapper.find('th').at(1).text()).to.equal('Ratings');
        expect(wrapper.find('th').at(2).text()).to.equal('Rate');
        expect(wrapper.find('td')).to.have.length(27);
        expect(wrapper.find('button')).to.have.length(9);
        expect(wrapper.text()).to.contains('Rate It!');
    });
    
    it('<ItemList/> provides navigation to <Rater/>',() => {
        wrapper.find('a').first().simulate('click',{ button: 0 });
        expect(wrapper.text()).to.contains('Kindly rate this book.');
        expect(wrapper.find('#book-rating > .far')).to.have.length(5);
    });
    
    it('<ItemList/> display error message if the list of books is empty',()=>{     
        wrapper = mount(
                    <MemoryRouter>
                        <Route path="/rater/:title" render={()=><Rater store={store} books={books} match={params}/>} />
                        <ItemList books="" randomRaterList={false} />
                    </MemoryRouter>
                    );
        expect(wrapper.text()).to.contains('List of Books is Empty!');
    });
    it('renders <ItemList/> with disabled RateIt! button in case of <RandomRater/>',()=>{     
        wrapper = mount(
                    <MemoryRouter>
                        <ItemList books={books} randomRaterList={true} />
                    </MemoryRouter>
                    );
        expect(wrapper).to.exist;
        expect(wrapper.text()).to.contains('Rate It!');
        expect(wrapper.find('button').filter('[disabled=true]')).to.have.length(9);
    });

});