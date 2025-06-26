import { Pessoa } from "./Pessoa";


export class Membro extends Pessoa{
    constructor(
        nome: string,
        matricula: string,
        endereco: string,
        telefone: string
    ) {
        super(nome, matricula, endereco, telefone)
    }
}