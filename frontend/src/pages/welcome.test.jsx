
import React from 'react';
import { render, screen } from '@testing-library/react';
import { configure, EnzymeAdapter, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Lobby from './lobby';
import Welcome from './welcome';
configure({ adapter: new Adapter() });

// Welcome page
describe('Welcome', () => {
    const noop = () => { }
    const modalStarta = shallow(<Welcome />);

    it('is matched with snapshot', () => {
      expect(modalStarta).toMatchSnapshot();
    });

    it('triggers Login onClike event handler when clicked', () => {
      const onClick = jest.fn();
      shallow(<goToLogIn onClick={onClick} />).simulate('click');
      expect(onClick).toHaveBeenCalledTimes(1);
    })

    it('triggers playgame onClike event handler when clicked', () => {
      const onClick = jest.fn();
      shallow(<goToPlay onClick={onClick} />).simulate('click');
      expect(onClick).toHaveBeenCalledTimes(1);
    })
  }
  )
