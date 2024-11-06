import { Authenticated, Refine } from '@refinedev/core';
import { dataProvider, liveProvider } from '@refinedev/appwrite';
import {
    AuthPage,
    ErrorComponent,
    RefineThemes,
    ThemedLayoutV2,
    useNotificationProvider,
} from '@refinedev/antd';
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
} from '@refinedev/react-router-v6';
import '@refinedev/antd/dist/reset.css';

import { App as AntdApp, ConfigProvider } from 'antd';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import { appwriteClient } from './utility';
import { authProvider } from './authProvider';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <AntdApp>
                    <Refine
                        dataProvider={dataProvider(appwriteClient, {
                            databaseId: '<APPWRITE_DATABASE_ID>',
                        })}
                        liveProvider={liveProvider(appwriteClient, {
                            databaseId: '<APPWRITE_DATABASE_ID>',
                        })}
                        authProvider={authProvider}
                        routerProvider={routerProvider}
                        notificationProvider={useNotificationProvider}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayoutV2>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            ></Route>

                            <Route
                                element={
                                    <Authenticated fallback={<Outlet />}>
                                        <NavigateToResource resource="<APPWRITE_COLLECTION_ID>" />
                                    </Authenticated>
                                }
                            >
                                <Route path="/login" element={<AuthPage />} />
                                <Route
                                    path="/register"
                                    element={<AuthPage type="register" />}
                                />
                            </Route>

                            <Route
                                element={
                                    <Authenticated>
                                        <ThemedLayoutV2>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                    </Refine>
                </AntdApp>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
