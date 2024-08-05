export type HistoricoProps = {
	visible: boolean
	fecharModal: () => void
	historico: HistoricoItem[]
	removerHistorico: ({ id }: { id: string }) => void
}

export type HistoricoItem = {
	resultado: string
	equacao: string
	id: string
}
