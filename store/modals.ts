import create from 'zustand';

interface ModalsStore {
  isExampleModalOpened: boolean;
  setIsExampleModalOpened: (payload: boolean) => void;
  isEditListItemModalOpened: boolean;
  setIsEditListItemModalOpened: (payload: boolean) => void;
  editListItemId: string;
  setEditListItemId: (payload: string) => void;
}

const useModalsStore = create<ModalsStore>((set) => ({
  isExampleModalOpened: false,
  setIsExampleModalOpened: (payload: boolean) =>
    set(() => ({
      isExampleModalOpened: payload,
    })),
  isEditListItemModalOpened: false,
  setIsEditListItemModalOpened: (payload: boolean) => {
    set(() => ({
      isEditListItemModalOpened: payload,
    }));
  },
  editListItemId: '',
  setEditListItemId: (payload: string) => {
    set(() => ({
      editListItemId: payload,
    }));
  },
}));

export default useModalsStore;
