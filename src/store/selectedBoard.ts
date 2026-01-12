import { create } from "zustand";

interface SelectedBoardState {
    selectedBoardId: string | null;
    selectedBoardName: string | null;
    setSelectedBoard: (id: string | null, name: string | null) => void;
}

export const useSelectedBoardStore = create<SelectedBoardState>((set) => ({
    selectedBoardId: null,
    selectedBoardName: null,
    setSelectedBoard: (id, name) => set(() => ({ selectedBoardId: id, selectedBoardName: name}))
}));