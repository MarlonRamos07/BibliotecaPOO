export class Livro {
    constructor(
        private _titulo: string, // Aqui os atributos podem ser privados justamente porque nennhuma classe é herdeira de Livro
        private _autor: string,
        private _isbn: string,      // Como nenhuma classe precisa acessar diretamente atributos como _titulo e _autor 
        private _anoPublicacao: number
    ) {}


    public getTitulo(): string {    
        return this._titulo
    }

    public setTitulo(titulo: string): void {
        this._titulo = titulo
    }

    public getAutor(): string{
        return this._autor;
    }

    public setAutor(autor: string): void {
        this._autor = autor;
    }

    public getISBN(): string {
        return this._isbn
    }

    public setISBN(isbn: string): void {
        this._isbn = isbn
    }

    public getAnoPublicacao(): number {
        return this._anoPublicacao
    }

    public setAnoPublicacao(ano: number): void {
        this._anoPublicacao = ano 
    }

}