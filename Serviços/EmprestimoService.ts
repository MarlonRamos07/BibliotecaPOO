import {Emprestimo } from '../Classes/Emprestimo'
import { Livro } from '../Classes/Livro'
import { Membro } from '../Classes/Membro'
import { FileHandler } from '../Utilidades/FileHandler'

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

    public carregarDeArquivo(caminho: string): void {
        const dados = FileHandler.carregar<any>(caminho)

        this.emprestimos = dados.map((e: any) => {
            const livro = new Livro(
                e._livro._titulo,
                e._livro._autor,
                e._livro._isbn,
                e._livro._anoPublicacao
            )

            const membro = new Membro(
                e._membro._nome,
                e._membro._matricula,
                e._membro._endereco,
                e._membro._telefone
            )

            const dataEmprestimo = new Date(e._dataEmprestimo)
            const dataDevolucao = e._dataDevolucao ? new Date(e._dataDevolucao) : null

            const emprestimo = new Emprestimo(livro, membro, dataEmprestimo)
            if (dataDevolucao) {
                emprestimo.registrarDevolucao(dataDevolucao)
            }
            return emprestimo
        })
    }

    
    public salvarEmArquivo(caminho: string): void {
        FileHandler.salvar(caminho, this.emprestimos)
    }
}