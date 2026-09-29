import { configureStore } from "@reduxjs/toolkit";
import { afterEach, describe, expect, it, vi } from "vitest";
import authReducer, { login } from "./authSlice";
import { careNestApi } from "./careNestApi";

describe("admin API authentication", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("sets the admin role and authorizes appointment and prescription queries", async () => {
    const requestedPaths: string[] = [];
    vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const request = input instanceof Request ? input : new Request(input, init);
      requestedPaths.push(new URL(request.url).pathname);
      expect(request.headers.get("authorization")).toBe("Bearer signed-admin-token");
      return new Response("[]", {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }));

    const store = configureStore({
      reducer: {
        auth: authReducer,
        [careNestApi.reducerPath]: careNestApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(careNestApi.middleware),
    });
    store.dispatch(login("signed-admin-token"));

    expect(store.getState().auth.role).toBe("ADMIN");
    expect(store.getState().auth.isAuthenticated).toBe(true);
    await Promise.all([
      store.dispatch(careNestApi.endpoints.getAppointments.initiate()).unwrap(),
      store.dispatch(careNestApi.endpoints.getPrescriptions.initiate()).unwrap(),
    ]);

    expect(requestedPaths).toEqual(expect.arrayContaining(["/appointments", "/prescriptions"]));
  });
});
