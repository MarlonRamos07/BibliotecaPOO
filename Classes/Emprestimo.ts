import { Livro } from './Livro'
import { Membro } from './Membro'

export class Emprestimo {
    constructor(

       private _livro: Livro,
       private _membro: Membro,
       private _dataEmprestimo: Date,
       private _dataDevolucao: Date | null = null 
    ) {}

    public getLivro(): Livro {
        return this._livro
    }

    public getMembro(): Membro{
        return this._membro
    }

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
        return this._dataDevolucao === null;
    }















}