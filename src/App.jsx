import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AppRoutes />
    </>
  );
};

export default App;
