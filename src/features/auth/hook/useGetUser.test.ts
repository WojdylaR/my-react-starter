import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "../../../test/testUtils";
import { waitFor } from "@testing-library/dom";

vi.mock("../../../infrastructure/client", () => ({
    api: {
        get: vi.fn()
    }
}))

vi.mock("../../../shared/components/notification/notification", () => ({
  notifications: {
    success: vi.fn(),
    error: vi.fn(),
  }
}));

const mockSetUser = vi.fn();

vi.mock("../../../stores/userStore", () => ({
  useUsersStore: () => ({
    setUser: mockSetUser
  })
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
    useNavigate: () =>mockNavigate
}))

import { useGetUser } from "./useGetUser";
import { api } from "../../../infrastructure/client";
import type { IUserResponse } from "../../user/userInterfaces";
import type { AxiosResponse } from "axios";
import { notifications } from "../../../shared/components/notification/notification";

describe("useGetUser", () => {
    beforeEach(() => {
            vi.clearAllMocks()
             mockSetUser.mockClear();
        })

    it ("should correctly initialize", () => {

        const { result } = renderHook(() => useGetUser())

        expect(result.current.isLoading).toBe(false)
        expect(api.get).not.toHaveBeenCalled();
    })

    it ("should  handle succes and set user data", async () => {

        vi.mocked(api.get).mockResolvedValueOnce({
            data: {
                uuid: "1234",
                createdAt: "2024-01-01",
                updatedAt: "2024-01-01",
                email: "test@test.com",
                username: "testuser",
            }
        } as AxiosResponse<IUserResponse>)

        const { result } = renderHook(() => useGetUser())

        await result.current.refetch()
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
            expect(result.current.error).toBeNull()
        })


        expect(mockSetUser).toHaveBeenCalledWith({
            uuid: "1234",
            email: "test@test.com",
            username: "testuser",
        })

        expect(notifications.success).toHaveBeenCalledWith('Connexion réussie !');
        expect(mockNavigate).toHaveBeenCalledWith('/signboard');
    })

    it ("should handle error", async () => {
        vi.mocked(api.get).mockRejectedValueOnce(new Error("Failed to fetch user"))

        const { result } = renderHook(() => useGetUser())

        await result.current.refetch()

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
            expect(result.current.error).toBeDefined()
            expect(result.current.isError).toBe(true)
        })
    })
})