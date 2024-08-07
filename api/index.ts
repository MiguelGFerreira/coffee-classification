"use server"

import { zCoffeeLotSchema } from "@/types";

const ip = "10.10.200.142";

export async function getLotes() {
	const res = await fetch(`http://${ip}:8000/express-coffee/lotes`)
	if (!res.ok) {
		throw new Error('Falha ao buscar dados');
	}
	return res.json()
}

export async function getLoteById(idlote: string) {
	const res = await fetch(`http://${ip}:8000/express-coffee/lotes/${idlote}`)
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
		"ac18": data.ac18,
		"peneira17": data.peneira17,
		"moka10": data.moka10,
		"peneira16": data.peneira16,
		"peneira15": data.peneira15,
		"peneira14": data.peneira14,
		"peneira13": data.peneira13,
		"peneira12": data.peneira12,
		"peneira10_11": data.peneira10_11,
		"cata": data.cata,
		"resultado": data.clas_resultado,
		"pagamento": data.clas_pagamento,
	});

	console.log("post: ", raw);

	fetch(
		`http://${ip}:8000/express-coffee/lotes/${idlote}`,
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

export async function patchLote(data: zCoffeeLotSchema, clas_id: number | undefined) {
	const url = `http://${ip}:8000/express-coffee/lotes/${clas_id}`;
	const myHeaders = new Headers();

	myHeaders.append('Content-Type', 'application/json');


	const raw = JSON.stringify({
		"clas_id": clas_id,
		"defeitos": data.defeitos,
		"umidade": data.umidade,
		"fundo10": data.fundo10,
		"impurezas": data.impurezas,
		"broca": data.broca,
		"ac18": data.ac18,
		"peneira17": data.peneira17,
		"moka10": data.moka10,
		"peneira16": data.peneira16,
		"peneira15": data.peneira15,
		"peneira14": data.peneira14,
		"peneira13": data.peneira13,
		"peneira12": data.peneira12,
		"peneira10_11": data.peneira10_11,
		"cata": data.cata,
		"resultado": data.clas_resultado,
		"pagamento": data.clas_pagamento,
	});

	console.log("patch: ", raw);

	try {
		await fetch(url, {
			method: 'PATCH',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		});
	} catch (error) {
		console.error('Falha ao atualizar classificação: ', error);
	}
}
