import { Membro } from '../Classes/Membro'
import { MembroService } from '../Serviços/MembroService'

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

    it('Deve atualizar informações de um membro existente')
















})