import * as fs from 'fs'


export class FileHandler {
    static salvar<T>(arquivo: string, dados: T[]): void { // Esse <T> significa que é um tipo genérico, no meu caso pode ser Livro,Membro,Empréstimo etc..
        fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2), 'utf-8') // grava o conteúdo no arquivo e converte os dados em JSON
                                                                          // utf-8 é padrão, pro texto ficar com a codificação correta.
    }

    static carregar<T>(arquivo: string): T[] {
        if (!fs.existsSync(arquivo)){ // Checa se o arquivo existe
            return [] // Se não existe, retorna um array vazio.
        }

        const conteudo = fs.readFileSync(arquivo, 'utf-8') // Lê todo o conteúdo como string
        return JSON.parse(conteudo) as T[] // Converte o texto JSON pra um objeto JS  
    }
}

// Esses métodos são static porque não guardam dados internos, são só " Utilitários " 
// São da classe e não de uma instância, ou seja, podem ser chamados sem criar um objeto dessa classe FileHandler.
