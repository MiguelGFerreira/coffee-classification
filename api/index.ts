import { zCoffeeLotSchema } from "@/types";

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

export const postLote = async (data: zCoffeeLotSchema, idlote: number, numLote: string) => {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const raw = JSON.stringify({
		"idlote": idlote,
		"numLote": numLote,
		"defeitos": data.defeitos,
		"umidade": data.umidade,
		"fundo10": data.fundo10,
		"impurezas": data.impurezas,
		"broca": data.broca,
		"p18": data.ac18,
		"p17": data.peneira17,
		"mk10": data.mk10,
		"p16": data.p16,
		"p15": data.p15,
		"p14": data.p14,
		"p13": data.p13,
		"p12": data.p12,
		"p10_11": data.p10_11,
		"cata": data.cata,
	});

	fetch(
		`http://localhost:8000/express-coffee/lotes/${idlote}`,
		{
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
}

export async function patchLote(data: zCoffeeLotSchema, idlote: number, numLote: string) {
	console.log("patch");
	console.log(data);
	console.log(idlote);
	console.log(numLote);
}
