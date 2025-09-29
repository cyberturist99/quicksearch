import styles from "./SearchBookItem.module.css";
import { IBook } from "@/types/book";

interface SearchResultItemProps {
	book: IBook;
}

export default function SearchResultItem({ book }: SearchResultItemProps) {
	return (
		<li className={styles.bookCard}>
			<div className={styles.author}>Автор: {book.author}</div>
			<div className={styles.book}>Книга: {book.title}</div>
		</li>
	);
}
