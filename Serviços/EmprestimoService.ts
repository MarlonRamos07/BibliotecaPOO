import {Emprestimo } from '../Classes/Emprestimo'
import { Livro } from '../Classes/Livro'
import { Membro } from '../Classes/Membro'
import { FileHandler } from '../Utilidades/FileHandler'

//Gerencia a Lógica dos Empréstimos / Devoluções.

export class EmprestimoService {

    private emprestimos: Emprestimo[] = []

    public realizarEmprestimo(livro: Livro, membro: Membro): void { 
        const novoEmprestimo = new Emprestimo(livro, membro, new Date()) // Cria um novo objeto do tipo Emprestimo e usa a data atual.
        this.emprestimos.push(novoEmprestimo) // Adiciona no array
    }

    public registrarDevolucao(isbn: string, matricula: string): boolean { // Procura por um empréstimo que tenha essas condiçõe: mesmo ISBN, seja do mesmo membro, e que ainda esteja ativo.
        const emprestimo = this.emprestimos.find( e=>           // Se achou registra a data de devolução como hoje
            e.getLivro().getISBN() == isbn &&                   // retorna true se conseguiu devolver, e false se não encontrou.
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
        return this.emprestimos.filter(e => e.estaAtivo()) // Retorna somente empréstimos cujo o '' estaAtivo '' é true, ou seja, 
    }                                                      // que não foram devolvidos.

    public listarTodosEmprestimos(): Emprestimo[]{
        return this.emprestimos                             //Lista tudo no array de empréstimos.
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
                                                //Basicamente a mesma lógica, usa o FileHandler para ler o JSON e carregar os dados
            const membro = new Membro(          // Depois cria cada Livro e Membro com New ( para terem acesso aos métodos)
                e._membro._nome,
                e._membro._matricula,
                e._membro._endereco,
                e._membro._telefone
            )

            const dataEmprestimo = new Date(e._dataEmprestimo) // Recria o objeto Emprestimo com a data certa, e se tiver devolução, também registra.
            const dataDevolucao = e._dataDevolucao ? new Date(e._dataDevolucao) : null

            const emprestimo = new Emprestimo(livro, membro, dataEmprestimo)
            if (dataDevolucao) {
                emprestimo.registrarDevolucao(dataDevolucao)
            }
            return emprestimo
        })
    }

    
    public salvarEmArquivo(caminho: string): void {
        FileHandler.salvar(caminho, this.emprestimos) // Salva normalmente.
    }
}