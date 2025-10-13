import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const DialoglProvider = ({ children }) => {
  const [type, setType] = useState("");
  const [payload, setPayload] = useState(null);

  const openDialog = (type,data) => {
    setType(type);
    setPayload(data && data);
  };

  const closeDialog = () => {
    setType("");
    setPayload(null);
  };

  return (
    <DialogContext.Provider value={{ type, payload, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
