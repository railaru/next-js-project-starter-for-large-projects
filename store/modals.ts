import create from 'zustand';

interface ModalsStore {
  isEditListItemModalOpened: boolean;
  setIsEditListItemModalOpened: (payload: boolean) => void;
  editListItemId: string;
  setEditListItemId: (payload: string) => void;
}

const useModalsStore = create<ModalsStore>((set) => ({
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
