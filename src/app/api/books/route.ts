import { books } from "@/const/books";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const query = searchParams.get("q")?.trim() || "";

		const delay = Math.random() * 500 + 200;
		await new Promise((resolve) => setTimeout(resolve, delay));

		if (!query) {
			return new Response(JSON.stringify([]), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		const filteredBooks = books.filter((book) => {
			const searchQuery = query.toLowerCase();
			return book.title.toLowerCase().includes(searchQuery);
		});

		return new Response(JSON.stringify(filteredBooks), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Search API error:", error);
		return new Response(
			JSON.stringify({
				error: "Внутренняя ошибка сервера",
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
}
