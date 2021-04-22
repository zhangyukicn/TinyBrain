import React from 'react';
import { render, screen } from '@testing-library/react';
import { configure, EnzymeAdapter, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Lobby from './lobby';
import Login from './login';
configure({ adapter: new Adapter() })

describe('LogIn', () => {
    const noop = () => { };

    const modalStarta = shallow(<Login />);

    it('is matched with snapshot', () => {
      expect(modalStarta).toMatchSnapshot();
    });

    it('triggers submitLogIn onClike event handler when clicked', () => {
      const onClick = jest.fn();
      shallow(<submitLogIn onClick={onClick} />).simulate('click');
      expect(onClick).toHaveBeenCalledTimes(1);
    })

    it('triggers toSignUp onClike event handler when clicked', () => {
      const onClick = jest.fn();
      shallow(<toSignUp onClick={onClick} />).simulate('click');
      expect(onClick).toHaveBeenCalledTimes(1);
    })

    it('triggers goBack onClike event handler when clicked', () => {
      const onClick = jest.fn();
      shallow(<goBack onClick={onClick} />).simulate('click');
      expect(onClick).toHaveBeenCalledTimes(1);
    })
  }
  )
