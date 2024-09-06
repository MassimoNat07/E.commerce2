import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FirstPage } from "./Pages/FirstPage/FirstPage";
import { SignInPage } from "./Pages/SignInPage/SignInPage";
import { LogInPage } from "./Pages/LogInPage/LogInPage";
import { HomePage } from "./Pages/HomePage/HomePage";
import { CategoryPage } from "./Pages/CategoryPage/CategoryPage";
import { Products } from "./Pages/Products/Products";
import { Order } from "./Pages/Order/Order";
import { Cart } from "./Pages/Cart/Cart";
import { Confirmation } from "./Pages/Confirmation/Confirmation";
import { ConfirmationDelete } from "./Pages/ConfirnDeleteOrder/ConfirmDelete";
import { Success } from "./Pages/Success/Success";
import { InsideCart } from "./Pages/InsideCart/InsideCart";
import { CancelOrder } from "./Pages/CancelOrder/CancelOrder";
import { Profile } from "./Pages/Profile/Profile";
//import { PrivateRoute } from "./components/PrivateRoute/privateRoute";
import { PublicRoute } from "./components/PublicRoute/publicRoute";
import { CurrentUserContextProvider } from "./context/currentUserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",

    children: [
      {
        path: "/sign-in",
        element: <PublicRoute element={<SignInPage />} />,
      },
      {
        path: "/log-in",
        element: <PublicRoute element={<LogInPage />} />,
      },
      {
        path: "/enter",
        element: <PublicRoute element={<FirstPage />} />,
      },
      {
        path: "/order",
        element: <Order />, //privato
      },
      {
        path: "/cart",
        element: <Cart />, // Il carrello è pubblico, ma quando si premerà il tasto acquista devi essere loggato
      },

      {
        path: "/confirmation", // questa pagina deve essere privata, ci puoi entrare solo se sei registrato
        element: <Confirmation />,
      },

      {
        path: "/deleteOrder/:orderId", // questa pagina deve essere privata, ci puoi entrare solo se sei registrato
        element: <ConfirmationDelete />,
      },

      {
        path: "/success", // questa pagina deve essere privata, ci puoi entrare solo se sei registrato
        element: <Success />,
      },

      { path: "/insideCart", 

        element: <InsideCart/> 
      },

      {
        path: "/cancel",
        element: <CancelOrder />,
      },

      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:category",
        element: <CategoryPage />,
      },
      {
        path: "/product/:productId",
        element: <Products />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },
      // /Product/:productId dai un id alla rotta per i prodotti. ti richiami la pagina dei prodotti
      // analizzare meglio la rotta pubblica
    ],
  },
]);
// fare rotte private e rotte pubbliche
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CurrentUserContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </CurrentUserContextProvider>
  </React.StrictMode>
); //differente modo da svolgere
