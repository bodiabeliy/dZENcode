import React, {Suspense, useState} from 'react';
import { Provider } from 'react-redux'
import './styles/index.scss';
import { store } from 'app/providers/storeProvider/index'

import {classNames} from "shared/lib/classNames/classNames";
import {useTheme} from "app/providers/ThemeProvider";
import {AppRouter} from "app/providers/router";
import {Navbar} from "widgets/Navbar";
import {Sidebar} from "widgets/Sidebar";


const App = () => {
   const { theme } = useTheme();
    return (
        <Provider store={store}>
            <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
        </Provider>
        
    );
};

export default App;
