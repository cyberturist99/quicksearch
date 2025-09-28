"use client";
import SearchResultItem from "../SearchResultItem/SearchResultItem";
import styles from "./SearchInput.module.css";
export default function SearchInput() {
	const results = [
		{ author: "Пушкин А.С.", book: "Евгений Онегин" },
		{ author: "Толстой Л.Н.", book: "Война и мир" },
		{ author: "Достоевский Ф.М.", book: "Преступление и наказание" },
	];
	return (
		<div className={styles.wrapper}>
			<input
				type="text"
				placeholder="Введите название книги"
				className={styles.input}
			/>
			<ul className={styles.booksList}>
				{results.map((item, idx) => (
					<SearchResultItem key={idx} author={item.author} book={item.book} />
				))}
			</ul>
		</div>
	);
}
