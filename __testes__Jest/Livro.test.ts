import { Livro } from '../Classes/Livro'

describe('Testes Livro', () => {

    it('Deve criar um livro corretamente.', () => {
        const livro = new Livro('Clean Code', 'Robert C. Martin', '12345', 2008)
        expect(livro.getTitulo()).toBe('Clean Code')
        expect(livro.getAutor()).toBe('Robert C. Martin')
        expect(livro.getISBN()).toBe('12345')
        expect(livro.getAnoPublicacao()).toBe(2008)
    })
    
})
