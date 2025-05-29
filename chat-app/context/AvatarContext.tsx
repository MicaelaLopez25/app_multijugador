import React, { createContext, useState, useContext, ReactNode } from 'react';

type AvatarContextType = {
  avatar: any;
  setAvatar: (avatar: any) => void;
};

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [avatar, setAvatar] = useState<any>(null);

  return (
    <AvatarContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = (): AvatarContextType => {
  const context = useContext(AvatarContext);
  if (!context) throw new Error("useAvatar debe usarse dentro de un AvatarProvider");
  return context;
};
