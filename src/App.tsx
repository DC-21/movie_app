import { QueryClient, QueryClientProvider } from "react-query";
import Movies from "./pages/Movies";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Navbar />
        <Movies />
      </div>
    </QueryClientProvider>
  );
}

export default App;
