import styles from "./SearchResultItem.module.css";

interface SearchResultItemProps {
	author: string;
	book: string;
}
export default function SearchResultItem({
	author,
	book,
}: SearchResultItemProps) {
	return (
		<li className={styles.bookCard}>
			<div className={styles.author}>Автор: {author}</div>
			<div className={styles.book}>Книга: {book}</div>
		</li>
	);
}
