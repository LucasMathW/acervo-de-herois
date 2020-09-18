const {deepStrictEqual, ok} = require("assert")

const Database = require("./database")

const DEFAULT_ITEM_CADASTRAR = {
  nome: "Flash",
  poder: 'Speed',
  id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Poder do anel',
    id: 2
}

describe('swite de manipulção de hérois', ()=>{ 
  
  before(async()=>{
      await Database.remover(); 
      await Database.cadastar(DEFAULT_ITEM_CADASTRAR);
      await Database.cadastar(DEFAULT_ITEM_ATUALIZAR);
  })

  it('Deve pesquisar um héroi usando um arquivo', async ()=>{
      const expected = DEFAULT_ITEM_CADASTRAR
      const [resultado] = await Database.listar(expected.id)
      // const posicaoUm = resultado[0]

      deepStrictEqual(resultado, expected)
  })

  it('Deve cadastrar um herói usando um arquivo', async ()=>{
      // const expected = {
      //   ...DEFAULT_ITEM_CADASTRAR,
      //   id: 2,
      //   nome: 'Batman',
      // }  
      const expected = DEFAULT_ITEM_CADASTRAR
      const resultado = await Database.cadastar(DEFAULT_ITEM_CADASTRAR)
      const [actual] = await Database.listar(DEFAULT_ITEM_CADASTRAR.id)
      deepStrictEqual(actual, expected) 
  })

  it('Remover um heroi por id.', async ()=>{
      const expected = true
      const resultado = await Database.remover(DEFAULT_ITEM_CADASTRAR.id)
      deepStrictEqual(resultado, expected)
  })

  it('Atualizar um heroi pelo id', async()=>{
      const expected = {
          ...DEFAULT_ITEM_ATUALIZAR,
          nome: "Batman",
          poder: "Dinheiro"
      }
      await Database.atualizar(expected.id, {
          nome: expected.nome,
          poder: expected.poder,
      })

      const [resultado] = await Database.listar(expected.id)
      console.log('resultado', [resultado])
      deepStrictEqual(resultado, expected)  
  })
})


