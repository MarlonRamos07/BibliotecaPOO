import {Emprestimo } from '../Classes/Emprestimo'
import { Livro } from '../Classes/Livro'
import { Membro } from '../Classes/Membro'

export class EmprestimoService {

    private emprestimos: Emprestimo[] = []

    public realizarEmprestimo(livro: Livro, membro: Membro): void {
        const novoEmprestimo = new Emprestimo(livro, membro, new Date())
        this.emprestimos.push(novoEmprestimo)
    }

    public registrarDevolucao(isbn: string, matricula: string): boolean {
        const emprestimo = this.emprestimos.find( e=>
            e.getLivro().getISBN() == isbn && 
            e.getMembro().getMatricula() === matricula && 
            e.estaAtivo()
        )
        if (emprestimo) {
            emprestimo.registrarDevolucao(new Date())
            return true
        }

        return false
    }

    public listarEmprestimosAtivos(): Emprestimo[] {
        return this.emprestimos.filter(e => e.estaAtivo())
    }

    public listarTodosEmprestimos(): Emprestimo[]{
        return this.emprestimos
    }
}