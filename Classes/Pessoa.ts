export class Pessoa {

    constructor(
        protected _nome: string,
        protected _matricula: string,  // Protected vai proteger os atributos de serem acessados diretamente fora da classe.
        protected _endereco: string,
        protected _telefone: string 
    ) {}

    public getNome(): string{ 
        return this._nome 
    }
                                                // Esses métodos são acessíveis de qualquer lugar, servem pra controlar o acesso.
    public setNome(nome: string): void {        // Aqui é um exemplo de encapsulamento 
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

    public exibirResumo(): string {    // Aqui é basicamente pra imprimir mais 'rápido' o nome e a matrícula de algum membro.
    return `${this._nome} - Matrícula: ${this._matricula}`

}
}

// Classe base Pessoa que representa dados comuns (nome, matrícula, etc.)
// Os atributos são "protected" para que possam ser reutilizados por classes filhas (ex: Membro)
// Getters e Setters públicos garantem encapsulamento e controle de acesso aos atributos