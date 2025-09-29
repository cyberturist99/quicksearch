"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBookItem from "../SearchBookItem/SearchBookItem";
import { useSearch } from "@/hooks/useSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { searchDelay } from "@/const/searchDelay";
import styles from "./BookList.module.css";

export default function BooksList() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [query, setQuery] = useState(searchParams.get("q") || "");
	const debouncedQuery = useDebounce(query, searchDelay);
	const { results, loading, error, search } = useSearch();

	useEffect(() => {
		const urlQuery = searchParams.get("q") || "";
		if (urlQuery !== query) {
			setQuery(urlQuery);
		}
	}, [searchParams]);

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		if (debouncedQuery.trim()) {
			params.set("q", debouncedQuery);
		} else {
			params.delete("q");
		}
		router.replace(`?${params.toString()}`);

		search(debouncedQuery);
	}, [debouncedQuery, search]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuery = e.target.value;
		setQuery(newQuery);
	};

	return (
		<div className={styles.wrapper}>
			<input
				type="text"
				placeholder="Введите название книги"
				className={styles.input}
				value={query}
				onChange={handleInputChange}
			/>

			{loading && <div className={styles.loading}>Поиск...</div>}
			{error && <div className={styles.error}>Ошибка: {error}</div>}

			<ul className={styles.booksList}>
				{results.map((book) => (
					<SearchBookItem key={book.id} book={book} />
				))}
			</ul>

			{!loading && !error && debouncedQuery && results.length === 0 && (
				<div className={styles.noResults}>Книги не найдены</div>
			)}
		</div>
	);
}
