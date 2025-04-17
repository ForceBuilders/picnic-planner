import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PicnicView from "../components/PicnicView";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ globally default to 5 minutes
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PicnicView />
    </QueryClientProvider>
  );
}
export default App;
