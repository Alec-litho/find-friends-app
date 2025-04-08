import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./assets/app.scss"
const UserListPage = lazy(() => import("./pages/UserList/UserList"));
const UserDetailPage = lazy(() => import("./pages/UserDetails/UserDetails"));

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<UserListPage />} />
              <Route path="/users/:id" element={<UserDetailPage />} />
            </Routes>
          </Suspense>
        </Router>
      </QueryClientProvider>
    </div>
  );
}
