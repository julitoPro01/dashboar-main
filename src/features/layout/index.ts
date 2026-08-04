export * from './AppInitializer';
export * from './FetchingStatus';
export * from './Query-provider';
export * from './Session-provider';

export * from './navBar/TopMenu';

import { LeftMenu as MainMenu } from './navBar/left-menu/LeftMenu'
import { LeftMenuWrapper } from './navBar/left-menu/LeftMenuWrapper';

// Unificamos los componentes en una sola exportación limpia
export const LeftMenu = Object.assign(MainMenu, {
    Wrapper: LeftMenuWrapper,
});
