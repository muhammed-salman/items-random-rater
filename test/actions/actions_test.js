import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BOOKS_LOAD,  BOOK_RATED, BOOK_RATED_ERROR } from '../../src/actions/types';
import { loadBooks, updateBooks  } from '../../src/actions/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('BOOKS_LOAD and BOOK_RATED action',()=>{
    
    let booksActions;
    
    beforeEach(()=>{
        const store = mockStore();
        store.dispatch(loadBooks());
        store.dispatch(updateBooks({'title': 'Database System Concepts', 'ratings': 1})); 
        store.dispatch(updateBooks({'title': 'This title is not there', 'ratings': 1}));
        store.dispatch(updateBooks({}));
        booksActions = store.getActions(); 
    });

    it('Successfully fetches the books from the items.json file',()=>{
        expect(booksActions).to.be.an('array');
        expect(booksActions[0]).to.be.an('object');
        expect(booksActions[0]).to.have.property('type',BOOKS_LOAD);
        expect(booksActions[0]).to.have.property('payload');
        expect(booksActions[0].payload).to.be.an('array');
        expect(booksActions[0].payload.length).to.equal(9);
        expect(booksActions[0].payload[0]).to.have.property('title');
        expect(booksActions[0].payload[0]).to.have.property('ratings');
    });

    it('Successfully rates and updates the books list',()=>{
        expect(booksActions[1]).to.be.an('object');
        expect(booksActions[1]).to.have.property('type',BOOK_RATED);
        expect(booksActions[1]).to.have.property('payload');
        expect(booksActions[1].payload).to.be.an('array');
        expect(booksActions[1].payload.length).to.equal(9);
        expect(booksActions[1].payload[0]).to.have.property('title');
        expect(booksActions[1].payload[0]).to.have.property('ratings');
        expect(booksActions[1].payload).to.deep.include({'title': 'Database System Concepts', 'ratings': 1});
        expect(booksActions[2].payload).to.not.deep.include({'title': 'This title is not there', 'ratings': 1});
    });

    it('Does not include any unknown title in the books list during update',()=>{
        expect(booksActions[2]).to.be.an('object');
        expect(booksActions[2]).to.have.property('type',BOOK_RATED);
        expect(booksActions[2]).to.have.property('payload');
        expect(booksActions[2].payload).to.be.an('array');
        expect(booksActions[2].payload.length).to.equal(9);
        expect(booksActions[2].payload[0]).to.have.property('title');
        expect(booksActions[2].payload[0]).to.have.property('ratings');
        expect(booksActions[2].payload).to.not.deep.include({'title': 'This title is not there', 'ratings': 1});
    });
    
    it('Throws an error if we supply an empty book object during update',()=>{
        expect(booksActions[3]).to.be.an('object');
        expect(booksActions[3]).to.have.property('type',BOOK_RATED_ERROR);
        expect(booksActions[3]).to.have.property('payload');
        expect(booksActions[3].payload).to.not.be.an('array');
        expect(booksActions[3].payload).to.equal('No Book recieved.');
    });
});