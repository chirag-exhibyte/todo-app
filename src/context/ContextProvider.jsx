import React from "react";
import { DialoglProvider } from "./DialogContext";
import { AuthProvider } from "./AuthContext";

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <DialoglProvider>{children}</DialoglProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
