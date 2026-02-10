import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "../../../test/testUtils";
import { waitFor } from "@testing-library/dom";

vi.mock("../../../infrastructure/client", () => ({
    api: {
        post: vi.fn()
    }
}))

vi.mock("../../../stores/credentialsStore", () => ({
    useCredentialsStore: vi.fn(() => ({
        setToken: vi.fn()
    }))
}))


import { useLogin } from "./useLogin";
import { api } from "../../../infrastructure/client";
import { useCredentialsStore } from "../../../stores/credentialsStore";

describe("useLogin", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("should handle successful login", async () => {
        vi.mocked(api.post).mockResolvedValueOnce({
            data: {
                token: "fake-token",
                refreshToken: 'fake-refresh-token'
            }
        })
        
        const { result } = renderHook(() => useLogin())
        
        await result.current.mutateAsync({ 
            email: "test@test.com", 
            password: "password" 
        })

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })

        expect(result.current.data).toEqual({
            data: {
                token: "fake-token",
                refreshToken: 'fake-refresh-token'
            }
        })
    })

    it("should handle failed login", async () => {
        vi.mocked(api.post).mockRejectedValueOnce(
            new Error("Invalid credentials"))
    

        const { result } = renderHook(() => useLogin())

        await result.current.mutateAsync({ 
            email: "test@test.com", 
            password: "password" 
        }).catch(() => {})

        await waitFor(() => {
            expect(result.current.isError).toBe(true)
            expect(result.current.error).toBeDefined()
        })
    })

    it("should call setToken on successful login", async () => {
        const mockSetToken = vi.fn()
        
        vi.mocked(useCredentialsStore).mockReturnValue({
            setToken: mockSetToken
        })
        
        vi.mocked(api.post).mockResolvedValueOnce({
            data: {
                token: "fake-token",
                refreshToken: "fake-refresh-token"
            }
        })
        
        const { result } = renderHook(() => useLogin())
        
        await result.current.mutateAsync({ 
            email: "test@test.com", 
            password: "password" 
        })
        
        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })
        
        expect(mockSetToken).toHaveBeenCalledWith({
            token: "fake-token", 
            refreshToken: "fake-refresh-token"
        })
    })
})