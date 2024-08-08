import { execute } from "./sql209";

export async function getDepartamento(usuario, relatorio) {
	return await execute(
		`select TRIM(DEPARTAMENTO) AS DEPTO from TRISTAO..TCE_USER WITH(NOLOCK) WHERE UPPER(USUARIO) = UPPER('${usuario}') AND UPPER(RELATORIO) = UPPER('${relatorio}')`
	);
}

export async function getAcesso(usuario, relatorio, departamento) {
	return await execute(
		`select TRIM(ACESSO) AS ACESSO
		from TRISTAO..TCE_USER WITH(NOLOCK)
		WHERE UPPER(USUARIO) LIKE UPPER('%${usuario}%') AND
		UPPER(RELATORIO) = UPPER('${relatorio}')
		AND UPPER(TRIM(DEPARTAMENTO)) = UPPER('${departamento}')`
	);
}