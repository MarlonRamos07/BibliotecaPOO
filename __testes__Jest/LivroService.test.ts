import { Livro }  from '../Classes/Livro'
import { LivroService } from '../Serviços/LivroService'
import { FileHandler } from '../Utilidades/FileHandler'

jest.mock('../Utilidades/FileHandler', () => ({
  FileHandler: {
    salvar: jest.fn(),                                       // Mock do FileHandler
    carregar: jest.fn()
  }
}))

describe('Testes LivroService', () =>{
    let service: LivroService


    beforeEach(() =>{
        service = new LivroService()
    })

    it('Deve adicionar um livro sem erro', ()=>{
        const livro = new Livro('1984', 'George Orwell', '123456', 1949 )

        service.adicionar(livro)
        expect(service.listar()).toContain(livro)
    })

    it('Deve listar todos os livros corretamente', () => {
        const livro1 = new Livro('1984', 'George Orwell', '123', 1949)
        const livro2 = new Livro('Admirável Mundo Novo', 'Aldous Huxley', '456', 1932)

        service.adicionar(livro1)
        service.adicionar(livro2)

        expect(service.listar()).toEqual([livro1, livro2])
    })

    it('Deve buscar corretamente um livro por ISBN', () =>{
        const livro = new Livro('Dom Casmurro', 'Machado de Assis', '999', 1899)
        service.adicionar(livro)

        expect(service.buscarPorISBN('999')).toBe(livro)
    })

    it('Deve atualizar informações de um livro existente', () => {
        const livroOrignal = new Livro('Título Antigo', 'Autor A1', 'abc123', 2000)
        const livroAtualizado = new Livro('Título Novo', 'Autor A2', 'abc123', 2001)

        service.adicionar(livroOrignal)
        const sucesso = service.atualizar('abc123', livroAtualizado)

        expect(sucesso).toBe(true)
        expect(service.buscarPorISBN('abc123')).toBe(livroAtualizado)
    })

    it('Deve remover um livro especificado', () => {
        const livro = new Livro('Livro Do Edécio', 'Edécio', '001', 1840)
        service.adicionar(livro)

        const removido = service.remover('001')
        
        expect(removido).toBe(true)
        expect(service.listar()).not.toContain(livro)
    })

    it('Deve salvar no arquivo usando FileHandler', () => {
        const livro = new Livro('Memórias Póstumas', 'Machado', '789', 1881)
        service.adicionar(livro)
        service.salvarNoArquivo('livros.json')

        expect(FileHandler.salvar).toHaveBeenCalledWith('livros.json', [livro])
    })

    it('Deve carregar livros do arquivo usando FileHandler', () => {
        const mockDados = [
        { _titulo: 'Senhora', _autor: 'José de Alencar', _isbn: '654', _anoPublicacao: 1875 }
        ]
        ;(FileHandler.carregar as jest.Mock).mockReturnValue(mockDados)

        service.carregarDeArquivo('livros.json')

        const livros = service.listar()
        expect(livros.length).toBe(1)
        expect(livros[0].getTitulo()).toBe('Senhora')
        expect(livros[0].getISBN()).toBe('654')
    })

})