import { StateCreator } from "zustand";
import type { ControlsFloating, UiSlice } from './interface';
import { Store } from '../store.type';

const initFP: ControlsFloating = { cx: 0, cy: 0, open: false, type: null, status: "success" };

export const uiSlice: StateCreator<Store, [], [], UiSlice> = (set) => ({

    leftNavBarOpen: true,
    floatingPanel: initFP,
    fetchStatus: { status: "idle", titleMsg: undefined, descMsg: undefined },

    setLeftNavBarOpen: (open) => (set({ leftNavBarOpen: open })),
    setFloatingPanel: (state) => (set(s => ({ floatingPanel: { ...s.floatingPanel, ...state } }))),
    setCloseFloatingPanel() {
        set({ floatingPanel: initFP })
    },

    setFetchStatus: (status) => set({ fetchStatus: status })
})