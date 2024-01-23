import { QueryClient, QueryClientProvider } from "react-query";
import Movies from "./pages/Movies";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Movies />
      </div>
    </QueryClientProvider>
  );
}

export default App;
