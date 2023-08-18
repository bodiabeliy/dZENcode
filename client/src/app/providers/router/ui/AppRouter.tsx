import { getUserToken } from 'app/providers/storeProvider/reducers/UserSlice';
import React, {Suspense, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {Route, Routes} from "react-router-dom";
import {routeConfig} from "shared/config/routeConfig/routeConfig";
import { classNames } from 'shared/lib/classNames/classNames';


const AppRouter = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(getUserToken())
    }, [])
    
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {Object.values(routeConfig).map(({element, path}) => (
                    <Route
                        key={path}
                        path={path}
                        element={(
                            <Suspense fallback={<div>Loading...</div>}>
                                <div  className={classNames("page-wrapper", {}, ["main-page"])}>
                                    {element}
                                </div>
                            </Suspense>
                        )}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
