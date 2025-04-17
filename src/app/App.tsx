import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PicnicView from "../components/PicnicView";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // globally default to 1 hours
      staleTime: 1000 * 60 * 60,
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
