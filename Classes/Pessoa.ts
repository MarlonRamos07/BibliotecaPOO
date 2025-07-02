export class Pessoa {

    constructor(
        protected _nome: string,
        protected _matricula: string,
        protected _endereco: string,
        protected _telefone: string 
    ) {}

    public getNome(): string{
        return this._nome 
    }

    public setNome(nome: string): void {
        this._nome = nome
    }

    public getMatricula(): string {
        return this._matricula
    }

    public setMatricula(matricula: string): void{
        this._matricula = matricula
    }

    public getEndereco(): string {
        return this._endereco
    }

    public setEndereco(endereco: string): void{
        this._endereco = endereco
    }

    public getTelefone(): string {
        return this._telefone
    }

    public setTelefone(telefone: string): void{
        this._telefone = telefone
    }

    public exibirResumo(): string {
    return `${this._nome} - Matrícula: ${this._matricula}`
}

}
