import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {router} from "./router";
import './index.css';
import {Provider} from "react-redux";
import {store} from "./store";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);


