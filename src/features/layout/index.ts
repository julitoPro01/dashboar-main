export * from './components/AppInitializer';
export * from './components/FetchingStatus';
export * from './components/Query-provider';
export * from './components/Session-provider';

export * from './components/navBar/TopMenu';

import { LeftMenu as MainMenu } from './components/navBar/left-menu/LeftMenu'
import { LeftMenuWrapper } from './components/navBar/left-menu/LeftMenuWrapper';

// Unificamos los componentes en una sola exportación limpia
export const LeftMenu = Object.assign(MainMenu, {
    Wrapper: LeftMenuWrapper,
});
