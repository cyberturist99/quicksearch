import { Suspense } from "react";
import SearchInput from "@/components/SearchInput/SearchInput";

export default function Home() {
	return (
		<div>
			<Suspense fallback={<div>Загрузка...</div>}>
				<SearchInput />
			</Suspense>
		</div>
	);
}
