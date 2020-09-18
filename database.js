const { readFile, writeFile } = require('fs')

const { promisify } = require("util")

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)
//outra forma de obter dados jsdon
//const dadosJson = require('./herois.json')

class Database {
  constructor(){
    this.NOME_ARQUIVO = "herois.json"
  }

  async obterDadosArquivo(){
      const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf-8')
      return JSON.parse(arquivo.toString());
  }

  async escreverArquivo(dados){
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
    return true
  }

  async cadastar(heroi){
      const dados = await this.obterDadosArquivo()
      const id = heroi.id <= 2 ? heroi.id : Date.now()
      const heroiComId = {
          id,
          ...heroi
      }
      const dadosFinal = [
        ...dados,
        heroiComId 
      ]
      const resultdao = await this.escreverArquivo(dadosFinal);
      return resultdao;
  }

  async listar(id){
     const dados = await this.obterDadosArquivo()
     const dadosFiltrados = dados.filter(item =>(id ? (item.id === id) : true))
     
     return dadosFiltrados
  }

async atualizar(id, atualizacoes){
    
    const dados = await this.obterDadosArquivo()
    const indice = dados.findIndex(item => item.id === parseInt(id))
    if(indice === -1){
      throw Error('O heroi informado não existe')
    }
    const atual = dados[indice]
    dados.splice(indice, 1)
    
    const objetoAtualizado = JSON.parse(JSON.stringify(atualizacoes));
    const dadoAtualizado = Object.assign({}, atual, objetoAtualizado);

    return await this.escreverArquivo([...dados, dadoAtualizado]);   
}

  async remover(id) {
      if(!id){
         await this.escreverArquivo([])
         return true
      }
      const dados = await this.obterDadosArquivo()
      const indice = await dados.findIndex(item => item.id === parseInt(id))
      if(indice === -1){
        throw Error('Seu herói não existe')
      }
      dados.splice(indice, 1)
      return await this.escreverArquivo(dados)
  }
}

module.exports = new Database();