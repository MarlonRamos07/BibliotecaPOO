import { Livro } from '../Classes/Livro'

export class LivroService {

    private livros: Livro[] = []

    public adicionar(livro: Livro): void {
        this.livros.push(livro)
    }

    public listar(): Livro[] {
        return this.livros
    }

    public buscarPorISBN(isbn: string): Livro | undefined {
        return this.livros.find(l => l.getISBN() === isbn)
    }

    public atualizar(isbn: string, novoLivro: Livro): boolean {
        const index = this.livros.findIndex(l => l.getISBN() === isbn)
        if (index !== -1){
            this.livros[index] = novoLivro
            return true;
        }
        return false;
    }

    public remover(isbn: string): boolean {
        const tamanhoInicial = this.livros.length
        this.livros = this.livros.filter(l => l.getISBN() !== isbn)
        return this.livros.length < tamanhoInicial
    }

}