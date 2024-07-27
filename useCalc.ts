import { useState } from "react"
import { operadores } from "./src/constants/teclas"

export function useCalc() {
	const [equacao, setEquacao] = useState("")
	const [resultado, setResultado] = useState("")
	const [erro, setErro] = useState("")

	const calcular = (e: string) => {
		try {
			const result = eval(e)
			setResultado(result)
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

	return {
		equacao: equacao,
		erro: erro,
		resultado: resultado,
		adicionaDigito: adicionaDigito,
	}
}
