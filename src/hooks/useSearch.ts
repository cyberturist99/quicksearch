"use client";

import { useState, useCallback, useRef } from "react";
import { IBook } from "@/types/book";

export const useSearch = () => {
	const [results, setResults] = useState<IBook[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const abortControllerRef = useRef<AbortController | null>(null);

	const search = useCallback(async (query: string) => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}

		if (!query.trim()) {
			setResults([]);
			setLoading(false);
			return;
		}

		abortControllerRef.current = new AbortController();

		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`/api/books?q=${encodeURIComponent(query)}`,
				{
					signal: abortControllerRef.current.signal,
				}
			);

			if (!response.ok) {
				throw new Error("Ошибка поиска");
			}

			const data = await response.json();
			setResults(data);
		} catch (err) {
			if (err instanceof Error && err.name !== "AbortError") {
				setError(err.message);
				setResults([]);
			} else if (typeof err === "string") {
				setError(err);
				setResults([]);
			} else {
				console.log(err);
				setError("Неизвестная ошибка");
				setResults([]);
			}
		} finally {
			setLoading(false);
		}
	}, []);

	return { results, loading, error, search };
};
