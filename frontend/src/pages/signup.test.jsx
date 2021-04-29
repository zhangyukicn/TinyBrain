import React from 'react';
import { getDefaultNormalizer, render, screen } from '@testing-library/react';
import { configure, EnzymeAdapter, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Lobby from './lobby';
import Signup from './signup';
configure({ adapter: new Adapter() })

describe('SignUp', () => {
    const noop = () => { };

    const modalStarta = shallow(<Signup />);

    const props = {
      username: 'Yuki',
      passwords: 'yyyyyyyyyy',
      mail: 'zzdfhjkdjfh@gmail.com'
    }

    it('is matched with snapshot', () => {
      expect(modalStarta).toMatchSnapshot();
    });

    it('triggers submitSignUp onClike event handler when clicked', () => {
      const onClick = jest.fn();
      shallow(<submitSignUp onClick={onClick} />).simulate('click');
      expect(onClick).toHaveBeenCalledTimes(1);
    })

    it('triggers toLogIn onClike event handler when clicked', () => {
      const onClick = jest.fn();
      shallow(<toLogIn onClick={onClick} />).simulate('click');
      expect(onClick).toHaveBeenCalledTimes(1);
    })

    it('should call checkPassword prop with input value', () => {
      const onChange = jest.fn();
      const component = shallow(<checkPassword onChange={onChange} />);
      component.simulate('change', { target: { value: 'zyruieriewqr' } });
      expect(component).toBeDefined();
    })
  })
