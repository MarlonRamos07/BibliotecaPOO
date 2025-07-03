import { EmprestimoService } from '../Serviços/EmprestimoService'
import { Livro } from '../Classes/Livro'
import { Membro } from '../Classes/Membro'
import { FileHandler } from '../Utilidades/FileHandler'


//Mock do jest
jest.mock('../Utilidades/FileHandler', () => ({

    FileHandler: {
        salvar: jest.fn(),
        carregar: jest.fn()
    }
}))

describe('Testes EmprestimoService', () => {
    let service: EmprestimoService
    let livro: Livro
    let membro: Membro

    beforeEach(() =>{               // Nesse momento, 22:34 do dia 02/07 eu percebi que poderia ter facilitado a minha vida.
        service = new EmprestimoService()
        livro = new Livro('1984', 'George Orwell', '123', 1949)
        membro = new Membro('Alice', '001', 'Rua J', '12345667789')
    })


    it('Deve realizar um empréstimo e listá-lo como ativo', () =>{
        service.realizarEmprestimo(livro, membro)

        const ativos = service.listarEmprestimosAtivos()
        expect(ativos.length).toBe(1)
        expect(ativos[0].getLivro().getISBN()).toBe('123')
        expect(ativos[0].getMembro().getMatricula()).toBe('001')

    })

    it('Deve registrar a devolução de um empréstimo', () => {
        service.realizarEmprestimo(livro, membro)

        const sucesso = service.registrarDevolucao('123', '001')
        expect(sucesso).toBe(true)

        const ativos = service.listarEmprestimosAtivos()
        expect(ativos.length).toBe(0)

        const todos = service.listarTodosEmprestimos()
        expect(todos[0].estaAtivo()).toBe(false)
    })

    it('Deve salvar os empréstimos usando FileHandler', () => {
        service.realizarEmprestimo(livro, membro)
        service.salvarEmArquivo('emprestimos.json')

        expect(FileHandler.salvar).toHaveBeenCalledWith(
            'emprestimos.json',
            expect.any(Array)
        )
    })

    it('Deve carregar os empréstimos usando FileHandler', () => {
        const mockEmprestimos = [
            {
            _livro: {
                _titulo: 'Dom Casmurro',
                _autor: 'Machado de Assis',
                _isbn: '111',
                _anoPublicacao: 1899
            },
            _membro: {
                _nome: 'José',
                _matricula: 'M002',
                _endereco: 'Rua X',
                _telefone: '8888-8888'
            },
            _dataEmprestimo: new Date('2025-07-01').toISOString(),
            _dataDevolucao: new Date('2025-07-03').toISOString()
            }
        ]

        ;(FileHandler.carregar as jest.Mock).mockReturnValue(mockEmprestimos)

        service.carregarDeArquivo('emprestimos.json')

        const todos = service.listarTodosEmprestimos()
        expect(todos.length).toBe(1)
        expect(todos[0].getLivro().getTitulo()).toBe('Dom Casmurro')
        expect(todos[0].estaAtivo()).toBe(false)
        })

})

