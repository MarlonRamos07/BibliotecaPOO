import * as fs from 'fs'


fs.writeFileSync('teste.txt', 'Testando File System com Ts-Node')
console.log('Arquivo criado com sucesso')

export class FileHandler {
    static salvar<T>(arquivo: string, dados: T[]): void {
        fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2), 'utf-8')
    }

    static carregar<T>(arquivo: string): T[] {
        if (!fs.existsSync(arquivo)){
            return []
        }

        const conteudo = fs.readFileSync(arquivo, 'utf-8')
        return JSON.parse(conteudo) as T[]
    }
}

