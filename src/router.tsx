import React from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";

import {MoviesPage, MovieDetailsPage, GenresPage} from "./MoviesPage";
import {MainLayout} from "./layouts";



const router = createBrowserRouter([
    {
        path:'', element: <MainLayout/> , children:[
            {
                index: true, element: <Navigate to={'movie'}/>
            },
            {
                path:'movie', element: <MoviesPage/>
            },
            {
                path:'movie/:id', element:<MovieDetailsPage/>
            },
            {
                path:'/genres/:genreId', element:<GenresPage/>
            }
        ]
    }
])

export {
    router
}