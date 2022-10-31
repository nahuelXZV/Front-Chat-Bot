import { createContext, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";

const AppContext = createContext({
  loading: true,
  isSidebarOpen: false,
  isSettingsPanelOpen: false,
  isSearchBoxOpen: false,
  toggleSidbarMenu: () => { },
  setIsSettingsPanelOpen: () => { },
});

export default function LayoutContext({ children }) {
  const isMobile = useMediaQuery({ query: "(max-width: 1200px)" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(isMobile);
  const [loading, setLoading] = useState(true);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  function handlerToggleSidbarMenu() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function handlerSetIsSearchBoxOpen() {
    setIsSearchBoxOpen(false);
  }

  return (
    <AppContext.Provider
      value={{
        loading,
        isSettingsPanelOpen,
        isSidebarOpen,
        isSearchBoxOpen,
        toggleSidbarMenu: handlerToggleSidbarMenu,
        setIsSettingsPanelOpen: handlerSetIsSearchBoxOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
