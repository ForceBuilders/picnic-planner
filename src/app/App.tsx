import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PicnicView from "../components/PicnicView";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PicnicView />
    </QueryClientProvider>
  );
}
export default App;
