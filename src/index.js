import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {Notifications} from "@mantine/notifications";
import {Button, createTheme, MantineProvider} from "@mantine/core";
import {ModalsProvider} from "@mantine/modals";
import authorizationService from "./common/authorization.service";
import {loginService} from "./module/login/login.service";
import Router from './router';

import './index.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const theme = createTheme({
    components: {
        Button: Button.extend({
            vars: (theme, props) => {
                if (props.size === 'list-actions') {
                    return {
                        root: {
                            '--button-fz': '0.85rem',
                            '--button-padding-x': '1.1rem',
                            '--button-height': '1.55rem'
                        }
                    }
                }
                return {root: {}}
            }
        })
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
        <Notifications position="top-center"/>
        <ModalsProvider>
            <Router/>
        </ModalsProvider>
    </MantineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

(function () {
    if (!window.location.href.endsWith("/login")) {
        if (authorizationService.getAuthorizedUser() == null) {
            loginService.getAuthorizedUser().then(user => {
                authorizationService.storeAuthorizedUser(user);
            })
        }
    }
})();

