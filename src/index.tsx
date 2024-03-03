import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { router } from "./router";
import './index.css';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(

        <RouterProvider router={router}/>

);


