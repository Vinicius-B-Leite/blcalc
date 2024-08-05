import { useState, useEffect } from "react"
import { operadores } from "./src/constants/teclas"
import { HistoricoItem } from "./src/components/Historico/type"

import { carregarDoStorage, salvarNoStorage } from "./src/storage"

export function useCalc() {
	const [equacao, setEquacao] = useState("")
	const [resultado, setResultado] = useState("")
	const [erro, setErro] = useState("")
	const [modalVisivel, setModalVisivel] = useState(false)
	const [historico, setHistorico] = useState<HistoricoItem[]>([])

	useEffect(() => {
		carregarHistorico()
	}, [])

	useEffect(() => {
		salvarNoCache()
	}, [historico])

	const carregarHistorico = async () => {
		const historicoCache = await carregarDoStorage<HistoricoItem[]>("@historico")
		if (!historicoCache) return

		console.log({ historicoCache })

		setHistorico(historicoCache)
	}

	const salvarNoCache = async () => {
		await salvarNoStorage<HistoricoItem[]>({
			chave: "@historico",
			valor: historico,
		})
		// await AsyncStorage.setItem("@historico", JSON.stringify(historico))
	}

	const calcular = async (e: string) => {
		try {
			const equacaoFormatada = e.replace(/x/g, "*").replace(/,/g, ".")
			const result = eval(equacaoFormatada)
			const resultadoFormatado = result.toString().replace(".", ",")
			setResultado(resultadoFormatado)

			setHistorico((historicoAnterior) => {
				const novoHistorico: HistoricoItem = {
					equacao: e,
					resultado: resultadoFormatado,
					id: String(Date.now()),
				}

				return [...historicoAnterior, novoHistorico]
			})
		} catch (error) {
			setErro("Equação inválida")
		}
	}

	const adicionaDigito = (digito: string) => {
		if (equacao == "") {
			const proximoDigitoEhOperador = operadores.includes(digito)
			if (proximoDigitoEhOperador) {
				return
			}
		}

		const ultimoDigito = equacao[equacao.length - 1]

		const ultimoDigitoEhOperador = operadores.includes(ultimoDigito)
		if (ultimoDigitoEhOperador) {
			const proxDigitoEhOperador = operadores.includes(digito)
			if (proxDigitoEhOperador) {
				return
			}
		}

		const ultimoDigitoEhParentese = ["(", ")"].includes(ultimoDigito)
		if (ultimoDigitoEhParentese) {
			const proxDigitoEhOperador = operadores.includes(digito)
			if (proxDigitoEhOperador || digito === ",") {
				return
			}
		}

		if (digito === "C") {
			setEquacao("")
			setResultado("")
			setErro("")
			return
		}

		if (digito === "<=") {
			setEquacao((equacaoAnterior) =>
				equacaoAnterior.substring(0, equacaoAnterior.length - 1)
			)
			return
		}

		if (digito === "=") {
			calcular(equacao)
			return
		}

		setEquacao((equacaoAnterior) => equacaoAnterior + digito)
	}

	const fecharModal = () => {
		setModalVisivel(false)
	}

	const abrirModal = () => {
		setModalVisivel(true)
	}

	const removerHistorico = ({ id }: { id: string }) => {
		// encontra o item no historico que tem o id
		// const index = historico.findIndex((item) => item.id === id)
		// const encontrouOItem = index > -1

		// if (encontrouOItem) {
		// 	const novoHistorico = [...historico]
		// 	novoHistorico.splice(index, 1)

		// 	setHistorico(novoHistorico)
		// }

		const novoHistorico = historico.filter((item) => item.id !== id)
		setHistorico(novoHistorico)
	}

	return {
		equacao: equacao,
		erro: erro,
		resultado: resultado,
		adicionaDigito: adicionaDigito,
		modalVisivel,
		fecharModal,
		abrirModal,
		historico,
		removerHistorico,
	}
}
