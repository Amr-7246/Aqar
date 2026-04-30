//& (browser bootstrapper) inertia.js is the bridge that link React SPA <--> Laravel server without needing API layer
//& handle routes, prevent reload the app on every route change, transfare the data between laravel and react as a react props and more
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import MainLayout from './layouts/main-layout';
// import { registerSW } from 'virtual:pwa-register';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
// // Automatically updates the service worker when new content is available
// const updateSW = registerSW({
//   onNeedRefresh() {
//     if (confirm('New content available. Reload?')) {
//       updateSW(true);
//     }
//   },
// });
createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>{
      const pages = import.meta.glob('./pages/**/*.tsx', {eager:true})
      let page = pages[`./pages/${name}.tsx`]
      page.default.layout = page.default.layout || ((page) => <MainLayout children={page} />)

      return page
    },
        // resolvePageComponent(
        //     `./pages/${name}.tsx`,
        //     import.meta.glob('./pages/**/*.tsx'),
        // )
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
