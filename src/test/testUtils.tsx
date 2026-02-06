import { type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook as originalRenderHook, render as originalRender } from '@testing-library/react'

// Créer le wrapper réutilisable
export const createTestQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    })
}

export const QueryWrapper = ({ children }: { children: ReactNode }) => {
    const queryClient = createTestQueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

// Custom renderHook avec wrapper automatique
export const renderHook = (callback: () => any) => {
    return originalRenderHook(callback, { wrapper: QueryWrapper })
}