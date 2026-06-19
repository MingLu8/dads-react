import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthedApp } from './AuthedApp.tsx';
import { PlainApp } from './PlainApp.tsx';
import { authConfig } from './auth.config.ts';
import { Auth0Provider } from '@auth0/auth0-react';

const root = createRoot(document.getElementById('root') as HTMLElement);

if(authConfig.enabled){
  root.render(
    <StrictMode>
      <Auth0Provider 
      clientId={authConfig.clientId} 
      domain={authConfig.domain}
      authorizationParams={{redirect_uri: window.location.origin, audience: authConfig.audience || undefined}}
      >
        <AuthedApp />
      </Auth0Provider>
    </StrictMode>,  
  )  
} else {
  root.render(
    <StrictMode>
      <PlainApp />
    </StrictMode>,
  )
}