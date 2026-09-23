import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { Network } from './pages/Network';
import { ApplyChapter } from './pages/ApplyChapter';
import { JoinUs } from './pages/JoinUs';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: AboutPage },
      { path: 'network', Component: Network },
      { path: 'apply', Component: ApplyChapter },
      { path: 'join', Component: JoinUs },
    ],
  },
]);
