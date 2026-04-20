import { useState, useEffect } from "react";
import { type User } from "../types";
import { searchUsersAPI } from "../api/users";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await searchUsersAPI(query);
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400); // ← debounce 400ms

    return () => clearTimeout(delay);
  }, [query]);

  return { query, setQuery, results, loading };
};