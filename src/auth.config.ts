export const authConfig = {
    enabled: import.meta.env.VITE_AUTH_ENABLED === 'true',
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID ?? '',
    domain: import.meta.env.VITE_AUTH0_DOMAIN ?? '',
    audience: import.meta.env.VITE_AUTH0_AUDIENCE ?? '',
}