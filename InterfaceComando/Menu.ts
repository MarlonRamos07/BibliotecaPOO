import promptSync from 'prompt-sync'
import { Livro } from '../Classes/Livro'
import { Membro } from '../Classes/Membro'
import { LivroService } from '../Serviços/LivroService'
import { MembroService } from '../Serviços/MembroService'
import { EmprestimoService } from '../Serviços/EmprestimoService'
import { FileHandler } from '../Utilidades/FileHandler'

const teclado = promptSync()

const livroService = new LivroService()
const membroService = new MembroService()
const emprestimoService = new EmprestimoService()

livroService.carregarDeArquivo('livros.json')
membroService.carregarDeArquivo('membros.json')

function salvarDados() {
    FileHandler.salvar('livros.json', livroService.listar())
    FileHandler.salvar('membros.json', membroService.listar())
}

function exibirMenu(){
    console.log('======= Biblioteca do Marlinho =======')
    console.log('1 - Cadastrar Livro ')
    console.log('2 - Listar Livros')
    console.log('3 - Cadastrar Membro')
    console.log('4 - Listar Membros')
    console.log('5 - Realizar Empréstimo')
    console.log('6 - Registrar Devolução')
    console.log('7 - Listar Empréstimos Ativos')
    console.log('0 - Sair')
}
 
function main(){
    let opcao: string

    do {
        exibirMenu()
        opcao = teclado('Escolha uma opção: ')

    switch (opcao) {

        case '1': {
            const titulo = teclado('Título do Livro: ')
            const autor = teclado('Autor: ')
            const isbn = teclado('ISBN: ')
            const ano = Number(teclado('Ano de Publicação: '))

            const livro = new Livro(titulo, autor, isbn, ano)
            livroService.adicionar(livro)

            console.log('Livro cadastrado com sucesso!')
            salvarDados()
            break
        }
        
        case '2': {
            const livros = livroService.listar()
           console.log("Lista de Livros:")
            livroService.listar().forEach(livro => {
            console.log(`${livro.getTitulo()} | ${livro.getAutor()} | ${livro.getISBN()} | ${livro.getAnoPublicacao()}`)
            })
            break
        }

        case '3': {
            const nome = teclado('Nome do Membro: ')
            const matricula = teclado('Matrícula: ')
            const endereco = teclado('Endereço: ')
            const telefone = teclado('Telefone: ')

            const membro = new Membro(nome, matricula, endereco, telefone)
            membroService.adicionar(membro)

            console.log('Membro caastrado com sucesso!')
            salvarDados()
            break
        }

        case '4': {
            const membros = membroService.listar()
            console.log('\n Lista de Membros: ')
            membros.forEach(m =>{
                console.log(` ${m.getNome()} | ${m.getMatricula()} | ${m.getEndereco()} | ${m.getTelefone()}`)
            })
            break
        }
        
        case '5': {
            const isbn = teclado('ISBN do Livro: ')
            const matricula = teclado('Matrícula do Membro: ')
            const livro = livroService.buscarPorISBN(isbn)
            const membro = membroService.buscarPorMatricula(matricula)

            if (livro && membro) {
                emprestimoService.realizarEmprestimo(livro, membro)
                console.log('Empréstimo realizado com sucesso!')
            } else {
                console.log('Livro ou Membro não encontrado')
            }
            break
        }

        case '6': {
            const isbn = teclado('ISBN do Livro a devolver: ')
            const matricula = teclado('Matrícula do Membro: ')
            const sucesso = emprestimoService.registrarDevolucao(isbn, matricula)

            if(sucesso){
                console.log('Devolução Registrada com sucesso!')
            } else {
                console.log('Empréstimo não encontrado')
            }
            break
        }

        case '7': {
            const emprestimos = emprestimoService.listarEmprestimosAtivos()
            console.log('Empréstimos Ativos: ')
            emprestimos.forEach(e=>{
                const livro = e.getLivro()
                const membro = e.getMembro()
                const data = e.getDataEmprestimo().toLocaleString()

                console.log(` - ${livro.getTitulo()} para ${membro.getNome()} em ${data}`)
            })
            break
        }


        case '0':
            console.log('Encerrando..')
            salvarDados()
            break


            default:
                console.log('Opção Inválida. Tente novamente')
    }
    } while (opcao !== '0')
}

export { main }

