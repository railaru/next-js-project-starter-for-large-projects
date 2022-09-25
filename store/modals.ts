import create from 'zustand';

interface ModalsStore {
  isExampleModalOpened: boolean;
  setIsExampleModalOpened: (payload: boolean) => void;
}

const useModalsStore = create<ModalsStore>((set) => ({
  isExampleModalOpened: false,
  setIsExampleModalOpened: (payload: boolean) =>
    set(() => ({
      isExampleModalOpened: payload,
    })),
}));

export default useModalsStore;
