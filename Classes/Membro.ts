import { Pessoa } from "./Pessoa";


export class Membro extends Pessoa{
    constructor(
        nome: string,
        matricula: string,
        endereco: string,
        telefone: string
    ) {
        super(nome, matricula, endereco, telefone) // atributos protegidos
    }
     public override exibirResumo(): string {
        // Comportamento ESPECÍFICO para Membro
        // Aqui é feito o polimorfismo, mesmo que eu tenha optado por manter quase que o mesmo comportamento.
        const resumoPai = super.exibirResumo();
        return `[MEMBRO] ${resumoPai}`; 
       
    }
}

// A classe membro é uma subclasse da classe Pessoa, ou seja, ela herd todas a propriedades e métodos de Pessoa.

// Fazendo isso ela já tem acesso aos métodos como : getNome, getMatricula, getEndereco, getTelefone 

// E a atributos protegidos como nome, matricua etc