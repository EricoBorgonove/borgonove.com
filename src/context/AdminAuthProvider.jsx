import { useEffect, useState } from "react";
import { AdminAuthContext } from "./adminAuthContext";

const ADMIN_API_BASE = `${import.meta.env.BASE_URL}api/admin`;

async function parseJsonSafe(response) {
  const raw = await response.text();
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadSession() {
      try {
        const response = await fetch(`${ADMIN_API_BASE}/session.php`, {
          method: "GET",
          credentials: "same-origin",
        });
        const data = await parseJsonSafe(response);

        if (!isActive) {
          return;
        }

        if (response.ok && data?.ok && data?.authenticated) {
          setIsAuthenticated(true);
          setAdminUser(data.user || null);
          return;
        }

        setIsAuthenticated(false);
        setAdminUser(null);
      } catch {
        if (isActive) {
          setIsAuthenticated(false);
          setAdminUser(null);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadSession();
    return () => {
      isActive = false;
    };
  }, []);

  async function signIn(username, password) {
    try {
      const response = await fetch(`${ADMIN_API_BASE}/login.php`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });
      const data = await parseJsonSafe(response);

      if (response.ok && data?.ok && data?.authenticated) {
        setIsAuthenticated(true);
        setAdminUser(data.user || null);
        return { ok: true };
      }

      setIsAuthenticated(false);
      setAdminUser(null);
      return {
        ok: false,
        error: data?.error || "LOGIN_INVALIDO",
      };
    } catch {
      setIsAuthenticated(false);
      setAdminUser(null);
      return { ok: false, error: "NETWORK_ERROR" };
    }
  }

  async function signOut() {
    try {
      await fetch(`${ADMIN_API_BASE}/logout.php`, {
        method: "POST",
        credentials: "same-origin",
      });
    } catch {
      // Limpa o estado local mesmo se o endpoint falhar.
    } finally {
      setIsAuthenticated(false);
      setAdminUser(null);
    }
  }

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        adminUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
