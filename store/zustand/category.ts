import {create} from 'zustand';

interface State {
    activeId: number;
    setActiveId: (activeId: number) => void;
}


export const useCategoryStore = create<State>()((set) => ({
    // начальное состояние
    activeId: 0,
    // функция, которая будет обновлять стейт
    setActiveId: (activeId: number) => set({ activeId }),   
}));