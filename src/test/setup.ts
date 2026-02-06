import * as matchers from '@testing-library/jest-dom/matchers'

import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

expect.extend(matchers);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

afterEach(() => {
  cleanup()
})