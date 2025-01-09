import React from 'react';
import {Navbar} from "./components/navbar";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {HomePage} from "./pages/home-page";
import {OrgPage} from "./pages/org-page";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Navbar />
                <div className={"px-8 pt-4 pb-16"}>
                    <Outlet />
                </div>
            </>
        ),
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/organisation",
                element: <OrgPage />,
            },
        ]
    }
]);

function App() {
    return <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
    </QueryClientProvider>
}

export default App;
