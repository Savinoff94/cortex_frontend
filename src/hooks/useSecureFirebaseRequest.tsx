import { useState } from "react";
import { getAuth } from "firebase/auth";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type RequestParams<T> = {
    url: string,
    method?: RequestMethod,
    body?: T | null
}

type UseSecureRequestResult<RES, PARAM> = {
    request: (params: RequestParams<PARAM>) => Promise<RES>;
    loading: boolean;
    error: string | null;
};
 
export function useSecureRequest<PARAM, RES>() : UseSecureRequestResult<RES, PARAM> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async ({ url, method = "GET", body = null }: RequestParams<PARAM>) => {
    setLoading(true);
    setError(null);

    try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            throw new Error("User not authenticated");
        }

        const idToken = await currentUser.getIdToken(true);

        const res = await fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${idToken}`,
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : null,
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message || "Request failed");
        }

        return json;
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        throw err;

    } finally {
        setLoading(false);
    }
  };

  return { request, loading, error };
}