import { Livro } from '../Classes/Livro'
import {FileHandler} from '../Utilidades/FileHandler'
export class LivroService {
                                                //Aqui está toda a lógica de gerenciamento dos livros 
    private livros: Livro[] = []             // Cria um array vazio chamaddo livros que só pode armazenar objetos do tipo Livro

    public adicionar(livro: Livro): void { // Adiciona um livro ao array livros usando push 
        this.livros.push(livro)
    }

    public listar(): Livro[] {
        return this.livros                  // Retorna o que tem dentro desse Array
    }

    public buscarPorISBN(isbn: string): Livro | undefined { // Pode ser do tipo Livro ou Undefined (caso não ache nada ) 
        return this.livros.find(l => l.getISBN() === isbn) // O find é um método JS que procura o primeiro item no array que tenha uma condição específica
                                                           // Se encontrar, retorna o objeto, se não, undefined.
    }                                                      // aqui l é cada livro do array de busca e o get é o método pra buscar o livro
                                                           // ==== isbn compara o ISBN do livro com o que foi digitado como parâmetro de busca.     
    
    
    
    public atualizar(isbn: string, novoLivro: Livro): boolean {
        const index = this.livros.findIndex(l => l.getISBN() === isbn) // Aqui procurs o índica no array de livros já cadastrados, o ''this.livros''
        if (index !== -1){                                             // Se encontrar o inde é o número, Se não encontrar o index é -1         
            this.livros[index] = novoLivro                          // Ataliza a posição [index] do array com o novo livro informado
            return true; // Se deu bom, retorna true
        }
        return false; // Se não achou, ( se o índice for -1 ), então retorna false 
    }

    public remover(isbn: string): boolean {
        const tamanhoInicial = this.livros.length // Pega o tamanho atual do Array
        this.livros = this.livros.filter(l => l.getISBN() !== isbn) //Aqui ele cria um novo array com os ISBN´s que são DIFERENTES do informado.
        return this.livros.length < tamanhoInicial  // Não mexe no livro dentro do array, apenas cria um outro sem aquele que foi informado.
    }                                               // A validação do tamanho é , se continua do mesmo tamanho, significa que nenhum livro com aquele ISBN existia.


     public carregarDeArquivo(caminho: string): void { // Aqui ele pega o caminho do arquivo que tem os dados
        const dados = FileHandler.carregar<any>(caminho) // O método lê o conteúdo do JSON e faz um Parse, transformando o texto em um array de objetos esse <any> significa basicamente que o tipo dos dados não é importante aqui.
        this.livros = dados.map(l => new Livro(l._titulo, l._autor, l._isbn, l._anoPublicacao))
    } // Esse map percorre cada item de dados criando objetos da classe Livro usando o construtor ' new Livro  .. ' 
      // É necessário porque os dados do JSON não são instâncias da classe, só objetos '' comuns ''
    
    
    public salvarNoArquivo(caminho: string): void {
        FileHandler.salvar(caminho, this.livros) // chama o método Salvar da classe FileHandler que precisa do caminho e do array atual de dados
    }
}