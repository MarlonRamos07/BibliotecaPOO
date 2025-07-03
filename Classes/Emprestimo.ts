import { Livro } from './Livro'
import { Membro } from './Membro'

export class Emprestimo {
    constructor(

       private _livro: Livro,   // O construtor de Empréstimo recebe esses objetos já prontos de Livro e Membro, 
       private _membro: Membro, 
       private _dataEmprestimo: Date,
       private _dataDevolucao: Date | null = null // Aqui temos o ' Union ' indicando que isso pode ser de mais de um tipo, ou seja 
    ) {}                                          // A _dataDevolucao pode ser um objeto do tipo Data ou pode ser null, 
                                                  // Isso vai ajudar a saber se o livro já foi devolvido, se ainda não foi, é null.
    public getLivro(): Livro {
        return this._livro
    }

    public getMembro(): Membro{
        return this._membro
    }
                                 // Esses métodos aqui são utilizados pra saber qual foi o livro emprestado ou quem pegou emprestado.
    public getDataEmprestimo(): Date {
        return this._dataEmprestimo;
    }

    public getDataDevolucao(): Date | null {
        return this._dataDevolucao
    }

    public registrarDevolucao(data: Date): void {
        this._dataDevolucao = data;
    }

    public estaAtivo(): boolean {
        return this._dataDevolucao === null;    // Aqui é uma pergunta simples : 'Esse empréstimo ainda está ativo?' 
                                                // Se a data de devolução for null, ainda não está ( como eu disse lá em cima)
    }















}