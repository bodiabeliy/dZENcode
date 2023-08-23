import { getUserToken } from 'app/providers/storeProvider/reducers/UserSlice';
import React, {Suspense, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {Route, Routes} from "react-router-dom";
import {routeConfig} from "shared/config/routeConfig/routeConfig";
import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader/Loader';


const AppRouter = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        //@ts-ignore
        dispatch(getUserToken())
    }, [])
    
    return (
            <Routes>
                {Object.values(routeConfig).map(({element, path}) => (
                    <Route
                        key={path}
                        path={path}
                        element={(
                            <Suspense fallback={<Loader />}>
                                <div  className={classNames("page-wrapper", {}, ["main-page"])}>
                                    {element}
                                </div>
                            </Suspense>
                        )}
                    />
                ))}
            </Routes>
    );
};

export default AppRouter;
