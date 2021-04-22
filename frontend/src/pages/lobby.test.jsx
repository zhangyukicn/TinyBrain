import React from 'react';
import { render, screen } from '@testing-library/react';
import { configure, EnzymeAdapter, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Lobby from './lobby';
configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
      pathname: './lobby',
      state: { id: 173450416 }
    }),
  }));

  describe('Lobby', () => {
  const modalStart = shallow(<Lobby />);

  it('is matched with snapshot', () => {
    expect(modalStart).toMatchSnapshot();
  });

  it('can display correct content when I enter Lobby', () => {
    expect(modalStart.find('h1').text()).toEqual('Waiting for game beginning!');
  });
})
