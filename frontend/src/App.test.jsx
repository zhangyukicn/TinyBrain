import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';
import { configure, EnzymeAdapter, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TokenContext from './TokenContext';
import Welcome from './pages/welcome';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import PlayerDashboard from './pages/playerdashboard';
import Lobby from './pages/lobby';
import Edit from './pages/editQuiz';
import EditQuestion from './pages/editQuestion';
import Playcontrol from './pages/playControl';
import PlayResult from './pages/playResult';
import PlayerplayingDashborad from './pages/playerplayingDashborad';
import Playerresult from './pages/playerresult';
import { ExpansionPanelActions } from '@material-ui/core';
configure({ adapter: new Adapter() });

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Login/i);
//   expect(linkElement).toBeInTheDocument();
// });

// playerplayingdashbord

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: './lobby',
    state: { id: 173450416 }
  }),
}));

describe('AnswerDispay', () => {
  const modalStarta = shallow(<PlayerplayingDashborad />);

  it('is matched with snapshot', () => {
    expect(modalStarta).toMatchSnapshot();
  });
})
