// @vitest-environment node
import { describe, test, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("server-only", () => ({}));

const mockCookieStore = {
  get: vi.fn(),
  set: vi.fn(),
  delete: vi.fn(),
};

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => Promise.resolve(mockCookieStore)),
}));

const { createSession, getSession, deleteSession, verifySession } = await import("@/lib/auth");

const COOKIE_NAME = "auth-token";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("createSession", () => {
  test("sets the cookie on the correct key", async () => {
    await createSession("user-123", "test@example.com");

    const [name] = mockCookieStore.set.mock.calls[0];
    expect(name).toBe(COOKIE_NAME);
  });

  test("token is a valid three-part JWT", async () => {
    await createSession("user-123", "test@example.com");

    const [, token] = mockCookieStore.set.mock.calls[0];
    expect(typeof token).toBe("string");
    expect(token.split(".")).toHaveLength(3);
  });

  test("JWT payload contains the provided userId and email", async () => {
    const { jwtVerify } = await import("jose");
    const secret = new TextEncoder().encode("development-secret-key");

    await createSession("user-123", "test@example.com");
    const [, token] = mockCookieStore.set.mock.calls[0];

    const { payload } = await jwtVerify(token, secret);
    expect(payload.userId).toBe("user-123");
    expect(payload.email).toBe("test@example.com");
  });

  test("cookie is httpOnly with sameSite lax and path /", async () => {
    await createSession("user-123", "test@example.com");

    const [, , options] = mockCookieStore.set.mock.calls[0];
    expect(options.httpOnly).toBe(true);
    expect(options.sameSite).toBe("lax");
    expect(options.path).toBe("/");
  });

  test("cookie is not secure outside production", async () => {
    await createSession("user-123", "test@example.com");

    const [, , options] = mockCookieStore.set.mock.calls[0];
    expect(options.secure).toBe(false);
  });

  test("cookie expiry is ~7 days from now", async () => {
    const before = Date.now();
    await createSession("user-123", "test@example.com");
    const after = Date.now();

    const [, , options] = mockCookieStore.set.mock.calls[0];
    const expiresMs = options.expires.getTime();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

    expect(expiresMs).toBeGreaterThanOrEqual(before + sevenDaysMs - 1000);
    expect(expiresMs).toBeLessThanOrEqual(after + sevenDaysMs + 1000);
  });
});

describe("getSession", () => {
  test("returns session payload for a valid token", async () => {
    await createSession("user-123", "test@example.com");
    const token = mockCookieStore.set.mock.calls[0][1];
    mockCookieStore.get.mockReturnValue({ value: token });

    const session = await getSession();

    expect(session).not.toBeNull();
    expect(session?.userId).toBe("user-123");
    expect(session?.email).toBe("test@example.com");
  });

  test("returns null when no cookie exists", async () => {
    mockCookieStore.get.mockReturnValue(undefined);

    const session = await getSession();

    expect(session).toBeNull();
  });

  test("returns null for a tampered token", async () => {
    mockCookieStore.get.mockReturnValue({ value: "invalid.token.here" });

    const session = await getSession();

    expect(session).toBeNull();
  });
});

describe("deleteSession", () => {
  test("deletes the auth cookie", async () => {
    await deleteSession();

    expect(mockCookieStore.delete).toHaveBeenCalledWith(COOKIE_NAME);
  });
});

describe("verifySession", () => {
  function makeRequest(token?: string) {
    const req = new NextRequest("http://localhost/api/test");
    if (token) {
      req.cookies.set(COOKIE_NAME, token);
    }
    return req;
  }

  test("returns session payload for a valid token in the request", async () => {
    await createSession("user-456", "other@example.com");
    const token = mockCookieStore.set.mock.calls[0][1];
    vi.clearAllMocks();

    const session = await verifySession(makeRequest(token));

    expect(session).not.toBeNull();
    expect(session?.userId).toBe("user-456");
    expect(session?.email).toBe("other@example.com");
  });

  test("returns null when request has no auth cookie", async () => {
    const session = await verifySession(makeRequest());

    expect(session).toBeNull();
  });

  test("returns null for an invalid token in the request", async () => {
    const session = await verifySession(makeRequest("bad.token.value"));

    expect(session).toBeNull();
  });
});
