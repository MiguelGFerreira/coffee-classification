export async function getLotes() {
	const res = await fetch(`http://localhost:8000/express-coffee/lotes`)
	if (!res.ok) {
		throw new Error('Falha ao buscar dados');
	}
	return res.json()
}

export async function getLoteById(idlote: string) {
	const res = await fetch(`http://localhost:8000/express-coffee/lotes/${idlote}`)
	if (!res.ok) {
		throw new Error('Falha ao buscar dados');
	}
	return res.json()
}