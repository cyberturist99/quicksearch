import { Suspense } from "react";
import BookList from "@/components/BookList/BookList";

export default function Home() {
	return (
		<div>
			<Suspense fallback={<div>Загрузка...</div>}>
				<BookList />
			</Suspense>
		</div>
	);
}
