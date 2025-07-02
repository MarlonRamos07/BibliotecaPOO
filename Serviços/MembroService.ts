import { Membro } from '../Classes/Membro'
import { FileHandler } from '../Utilidades/FileHandler'

export class MembroService {

    private membros: Membro[] = []

    public adicionar(membro: Membro): void {
        this.membros.push(membro)
    }

    public listar(): Membro[] {
        return this.membros
    }

    public buscarPorMatricula(matricula: string): Membro | undefined {
        return this.membros.find(m => m.getMatricula() === matricula)
    }

    public atualizar(matricula: string, novoMembro: Membro): boolean {
        const index = this.membros.findIndex(m => m.getMatricula() === matricula)
        if (index !== -1) {
            this.membros[index] = novoMembro
            return true
        }
        return false
    }

    public remover(matricula: string): boolean {
        const tamanhoInicial = this.membros.length
        this.membros = this.membros.filter(m => m.getMatricula() !== matricula)
        return this.membros.length < tamanhoInicial
    }


      public carregarDeArquivo(caminho: string): void {
        const dados = FileHandler.carregar<any>(caminho)
        this.membros = dados.map((m: any) =>
            new Membro(m._nome, m._matricula, m._endereco, m._telefone)
        )
    }

}