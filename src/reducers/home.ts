export enum HomeActionType {
  ADD_TAB_PAGE = 'ADD_TAB_PAGE',
  REMOVE_TAB_PAGE = 'REMOVE_TAB_PAGE',
  CHANGE_CURRENT_TAB_PAGE = 'CHANGE_CURRENT_TAB_PAGE',
  REMOVE_ALL_TAB_PAGE = 'REMOVE_ALL_TAB_PAGE',
  SAVE_HOME_DATA = 'SAVE_HOME_DATA',
}
const initialState = {
  panes: [],
  activeKey: '0',
  showModifyPwModal: false, // 显示修改密码弹框
  loading: false,
  notifyCount: 1
}

const home = (state = initialState, action: any) => {
  switch (action.type) {
    case HomeActionType.ADD_TAB_PAGE:
      const findPane: any = state.panes.find((item: any) => item.key === action.page.key);
      if (findPane) {
        if (action.page.params) {
          findPane.params = action.page.params;
        }
      }
      const newPanes = findPane
        ? [...state.panes]
        : [...state.panes, action.page];
      return Object.assign({}, state, {
        panes: newPanes,
        activeKey: action.page.key,
      });
    case HomeActionType.REMOVE_TAB_PAGE:
      let activeKey = state.activeKey;
      let lastIndexNum = 0;
      state.panes.forEach((pane: any, i: number) => {
        if (pane.key === action.key) {
          lastIndexNum = i - 1;

          // return true;
        }
      });
      lastIndexNum = lastIndexNum < 0 ? 0 : lastIndexNum;
      const panes: any = state.panes.filter((item: any) => item.key !== action.key);
      if (lastIndexNum >= 0 && activeKey === action.key) {
        activeKey = panes[lastIndexNum] ? panes[lastIndexNum].key : 0;
      }
      return Object.assign({}, state, {
        panes,
        activeKey: panes[lastIndexNum] ? panes[lastIndexNum].key : 0,
      });
    case HomeActionType.CHANGE_CURRENT_TAB_PAGE:
      return Object.assign({}, state, {
        activeKey: action.key,
      });
    case HomeActionType.REMOVE_ALL_TAB_PAGE:
      return Object.assign({}, state, {
        panes: [],
        activeKey: 0,
      });
    case HomeActionType.SAVE_HOME_DATA:
      if (action.payload) {
        return Object.assign({}, state, action.payload);
      }
      return state;

    default:
      return state;
  }
};
export default home;
