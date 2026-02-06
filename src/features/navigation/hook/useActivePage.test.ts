import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";

vi.mock("react-router-dom", () => ({
    useLocation: vi.fn()
}))

import useActivePage from "./useActivePage";
import { useLocation } from "react-router-dom";

describe("useActivePage", () => {
    it("should return true when first URL segment matches", () => {
        vi.mocked(useLocation).mockReturnValue({ 
            pathname: "/home",
            search: "",
            hash: "",
            state: null,
            key: "default"
        });
        const { result } = renderHook(() => useActivePage())
        expect(result.current("/home")).toBe(true)
    })
    it("should return true when first URL segment matches with some path", () => {
        vi.mocked(useLocation).mockReturnValue({ 
            pathname: "/home/details",
            search: "",
            hash: "",
            state: null,
            key: "default"
        });
        const { result } = renderHook(() => useActivePage())
        expect(result.current("/home")).toBe(true)
    })
    it("should return false when first URL segment does not match", () => {
        vi.mocked(useLocation).mockReturnValue({ 
            pathname: "/app",
            search: "",
            hash: "",
            state: null,
            key: "default"
        });
        const { result } = renderHook(() => useActivePage())
        expect(result.current("/home")).toBe(false)
    })
    
    it("should return false when first URL segment does not match with some path", () => {
        vi.mocked(useLocation).mockReturnValue({ 
            pathname: "/app/details",
            search: "",
            hash: "",
            state: null,
            key: "default"
        });
        const { result } = renderHook(() => useActivePage())
        expect(result.current("/home")).toBe(false)
    })
})