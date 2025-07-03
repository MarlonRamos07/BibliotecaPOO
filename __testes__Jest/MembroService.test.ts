import { Membro } from '../Classes/Membro'
import { MembroService } from '../Serviços/MembroService'
import { FileHandler } from '../Utilidades/FileHandler'

//Mock do jest passando o caminho para o fileHandler e os métodos salvar e carregar
jest.mock('../Utilidades/FileHandler', () => ({
  FileHandler: {
    salvar: jest.fn(),
    carregar: jest.fn()
  }
}))


describe('Testes MembroService', () => {
    let service: MembroService

    beforeEach(()=>{
        service = new MembroService()
    })

    it('Deve adicionar um membro sem erro', () => {
        const membro = new Membro('Marlon', '01', 'Rua Z', '1234')

        service.adicionar(membro)
        expect(service.listar()).toContain(membro)
    })

    it('Deve listar todos os membros corretamente', () =>{
        const membro1 = new Membro('Ana Maria', '001', 'Rua 1', '999-999')
        const membro2 = new Membro('João Pedro', '002', 'Rua 2', '888-888')

        service.adicionar(membro1)
        service.adicionar(membro2)
        expect(service.listar()).toEqual([membro1, membro2])
    })

    it('Deve buscar corretamente o membro por matrícula', () =>{
        const membro = new Membro('Josefa', '537', 'Rua Jhonson', '505050')

        service.adicionar(membro)
        expect(service.buscarPorMatricula('537')).toBe(membro)
    })

    it('Deve atualizar informações de um membro existente', () => {
        const membro = new Membro('João Pedro', '002', 'Rua 2', '888-888')
        const novo = new Membro('João Pedro Edécius', '002', 'Rua 4', '1111111111')
        service.adicionar(membro)
        const atualizado = service.atualizar('002', novo)
        

        expect(atualizado).toBe(true)
        expect(service.buscarPorMatricula('002')).toBe(novo)

    })

    it('Deve remover o membro especificado', ()=>{
        const membro = new Membro('João Pedro', '002', 'Rua 2', '888-888')
        service.adicionar(membro)
        const removido = service.remover('002')


        expect(removido).toBe(true)
        expect(service.listar()).not.toContain(membro)
    })

    it('Deve carregar membros do arquivo usando FileHandler', () => {
        const mockDados = [
        { _nome: 'Carlos', _matricula: '100', _endereco: 'Rua Nova', _telefone: '99999' }
        ]
        ;(FileHandler.carregar as jest.Mock).mockReturnValue(mockDados)

        service.carregarDeArquivo('membros.json')

        const membros = service.listar()
        expect(membros.length).toBe(1)
        expect(membros[0].getNome()).toBe('Carlos')
    })

})