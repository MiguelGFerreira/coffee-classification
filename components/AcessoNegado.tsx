interface Props {
	userlogon: string | undefined;
}

const AcessoNegado = ({ userlogon }: Props) => {
	return <p className="m-4">Usuário {userlogon} sem permissão</p>;
};

export default AcessoNegado;