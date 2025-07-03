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
emprestimoService.carregarDeArquivo('emprestimos.json')

function salvarDados() {
    FileHandler.salvar('livros.json', livroService.listar())
    FileHandler.salvar('membros.json', membroService.listar())
    FileHandler.salvar('emprestimos.json', emprestimoService.listarTodosEmprestimos())
}

function exibirMenu(){
    console.log('======= Biblioteca do Marlinho =======')
    console.log('1 - Cadastrar Livro ')
    console.log('2 - Listar Livros')
    console.log('3 - Editar Livros')
    console.log('4 - Remover Livros')
    console.log('5 - Cadastrar Membro')
    console.log('6 - Listar Membros')
    console.log('7 - Editar Membro')
    console.log('8 - Remover Membro')
    console.log('9 - Cadastrar Empréstimo')
    console.log('10 - Listar Empréstimos Ativos')
    console.log('11 - Listar TODOS os Empréstimos (devolvidos ou não) ')
    console.log('12 - Registrar Devolução')
    console.log('13 - Listar Histórico de Devoluções')
   
    console.log('0 - Sair')
}
 
function main(){
    let opcao: string

    do {
        exibirMenu()
        opcao = teclado('Escolha uma opção: ')

    switch (opcao) {

        case '1': {      // Cadastrar Livro
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
        
        case '2': {    //Listar Os Livros Cadastrados
            const livros = livroService.listar()
           console.log("Lista de Livros:")
            livroService.listar().forEach(livro => {
            console.log(`${livro.getTitulo()} | ${livro.getAutor()} | ${livro.getISBN()} | ${livro.getAnoPublicacao()}`)
            })
            break
        }

        case '3': { // Atualizar Livro já cadastrado
            const isbnEditar = teclado('Informe o ISBN do livro a ser editado: ')
            const livroExistente = livroService.buscarPorISBN(isbnEditar)
            if(livroExistente) {
                const novoTitulo = teclado('Novo título: ')
                const novoAutor = teclado('Novo autor: ')
                const novoAno = Number(teclado('Novo ano de publicação: '))

                const novoLivro = new Livro(novoTitulo, novoAutor, isbnEditar, novoAno)
                livroService.atualizar(isbnEditar, novoLivro)
                console.log('Livro modificado com sucesso')
            } else {
                console.log('Livro não encontrado no sistema.')
            }
            break
        }

        case '4': { // Remover um livro 
            const isbnRemover = teclado('Informe o ISBN do livr a ser removido: ')
            const removido = livroService.remover(isbnRemover)
            console.log(removido ? 'Livro removido com sucesso!' : 'Livro não encontrado ') // Ternário para substituir um if e else simples.
            break
        }

        case '5': { // Cadastrar um Membro
            const nome = teclado('Nome do Membro: ')
            const matricula = teclado('Matrícula: ')
            const endereco = teclado('Endereço: ')
            const telefone = teclado('Telefone: ')

            const membro = new Membro(nome, matricula, endereco, telefone)
            membroService.adicionar(membro)

            console.log('Membro cadastrado com sucesso!')
            salvarDados()
            break
        }

           case '6': { // Listar Membros Cadastrados
            const membros = membroService.listar()
            console.log('\n Lista de Membros: ')
           membros.forEach(m => {
           console.log(m.exibirResumo())
           })
            break
        }
        
        case '7': {  // Atualizar algum membro 
        const matriculaEditar = teclado('Informe a matrícula do membro a ser editado: ')
        const membroExistente = membroService.buscarPorMatricula(matriculaEditar)
        if(membroExistente) {
            const novoNome = teclado('Novo nome: ')
            const novoEndereco = teclado('Novo endereço: ')
            const novoTelefone = teclado('Novo telefone: ')

            const novoMembro = new Membro(novoNome, matriculaEditar, novoEndereco, novoTelefone)
            membroService.atualizar(matriculaEditar, novoMembro)
        } else {
            console.log('Membro não encontrado no sistema.')
        }
            break
        }

        case '8': { // Remover Membro
            const matriculaRemover = teclado('Informe a matrícula do membro a ser deletado: ')
            const removidoM = membroService.remover(matriculaRemover)
            console.log(removidoM ? 'Membro deletado com sucesso!' :  ' Membro não encontrado ') // Mesma lógica do livro
            break
        }

        case '9': { // Cadastrar um empréstimo 
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


         case '10': { // Listar Empréstimos Ativos
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


        case '11': { // Listar TODOS os empréstimos  
            const todos = emprestimoService.listarTodosEmprestimos()
            todos.forEach(e => {
            const livro = e.getLivro()
            const membro = e.getMembro()
            const dataEmprestimo = e.getDataEmprestimo().toLocaleDateString()
            const dataDevolucao = e.getDataDevolucao()?.toLocaleDateString() || "Ainda não devolvido"

             console.log(`${livro.getTitulo()} emprestado para ${membro.getNome()} em ${dataEmprestimo}, devolução: ${dataDevolucao}`)
        })
            break
        }

        case '12': { // Registrar Devolução 
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

        case '13': { // Listar Devoluções ( Empréstimos finalizados )
            const emprestimosFinalizados = emprestimoService.listarTodosEmprestimos().filter( e=> !e.estaAtivo()) // Filtra e pega todos que não estão ativos.

            if (emprestimosFinalizados.length === 0){
                console.log('Nenhum ')
            } else {
                console.log(' Histórico de Devoluções ')
                emprestimosFinalizados.forEach(e => {
                    console.log(`Livro: ${e.getLivro().getTitulo()}`)
                    console.log(`Membro: ${e.getMembro().getNome()}`)
                    console.log(`Data do Empréstimo: ${e.getDataEmprestimo().toLocaleDateString()}`)
                    console.log(`Data da Devolução: ${e.getDataDevolucao()?.toLocaleString()}`)
                    console.log('-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-')
                })
            }
            break
        }

        case '0':
            console.log('Dados salvos com sucesso.')
            console.log('Encerrando..')
            salvarDados()
            emprestimoService.salvarEmArquivo('emprestimos.json')
            break


            default:
                console.log('Opção Inválida. Tente novamente')
    }
    } while (opcao !== '0')
}

export { main }

