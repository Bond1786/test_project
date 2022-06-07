import { PAGE_TYPE } from '../redux/AppReducer';
import { loginAction, loginSuccessAction, pageChangeAction, resetAction } from './AppAction';
import * as DBAPIs from '../actions/Type';

describe('AppAction', () => {
  it('AppAction - pageChangeAction', () => {
    expect(pageChangeAction(PAGE_TYPE.LOGIN)).toEqual({ type: 'PAGE_CHANGE', payload: 'LOGIN' });
  });
});

describe('AuthAction', () => {
  it('AuthAction - resetAction', () => {
    expect(resetAction()).toEqual({ type: 'RESET' });
  });

  it('AuthAction - loginAction', () => {
    const config_sucess: DBAPIs.DBParam = {
      database: 'UnifiedDeviceDB',
      password: 'JsK6Bm@Th2C879k2',
      dbUrl: 'CHN-CL-DEVSQL',
      userName: 'UnifiedDeviceDB_user',
      type: DBAPIs.AUTH_TYPE.SQL_AUTH
    };

    expect(loginAction(config_sucess)).toEqual({ type: 'LOGIN', payload: config_sucess });
  });

  it('AuthAction - loginSuccessAction', () => {
    const config_sucess: DBAPIs.DBParam = {
      database: 'UnifiedDeviceDB',
      password: 'JsK6Bm@Th2C879k2',
      dbUrl: 'CHN-CL-DEVSQL',
      userName: 'UnifiedDeviceDB_user',
      type: DBAPIs.AUTH_TYPE.SQL_AUTH
    };

    expect(loginSuccessAction(config_sucess).type).toEqual('LOGIN_SUCCESS');
  });
});
