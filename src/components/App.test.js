import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  const app = shallow(<App/>);

  it('should render correctly', () => {
    expect(app).toMatchSnapshot();
  });

  it('should initialize state with an empty list of gifts', () => {
    expect(app.state().gifts).toEqual([]);
  });

  describe('When clicking the add-gift button', () => {
    const id = 1;

    beforeEach(() => {
      app.find('.btn-add').simulate('click');
    });

    afterEach(() => {
      app.setState({ gifts: [] })
    });

    it('should add new gift to `state` ', () => {
      expect(app.state().gifts).toEqual([{ id }]);
    });

    it('should add a new gift to the rendered list', () => {
      expect(app.find('.gift-list').children().length).toEqual(1);
    });

    it('should create a gift component', () => {
      expect(app.find('Gift').exists()).toBe(true);
    });

    describe('and the user wants to remove the added gift', () => {
      beforeEach(() => {
        app.instance().removeGift(id);
      });

      it('should remove the gift from state', () => {
        expect(app.state().gifts).toEqual([]);
      });
    });
  });
});