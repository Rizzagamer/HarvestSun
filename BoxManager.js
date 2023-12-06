/**
 * Gerencia as caixas de Tarefa e Diálogo
 */

import CaixaModal from './CaixaModal';
import todasAsTarefas from '../../config/tasks';
import dialogoAnimais from '../../config/dialog-animal';
import dialogoNPCs from '../../config/dialog-npc';
import config from "../../config";
import gameConfig from "../../config/game-config";

export default class GerenciadorCaixa {
  constructor(cena) {
    this.cena = cena;
    this.btns = this.cena._BTNS;
    this.carregarAtivos();
  }

  // adiciona botões ao jogo
  carregarAtivos() {
    this.definirAtivo({
      nome: 'botaoStatus', // nome da variável
      chave: 'btn-status', // chave da imagem a ser adicionada
      x: 167, // posição x
      y: config.altura - 468,
      cb: this.carregarCaixaStatus // função a ser executada no evento de clique
    });

    this.definirAtivo({
      nome: 'botaoStatusInativo',
      chave: 'btn-status-inactive',
      x: 167,
      y: config.altura - 468,
      cb: this.carregarCaixaStatus
    });

    this.definirAtivo({
      nome: 'botaoTarefa',
      chave: 'btn-tasks',
      x: 500,
      y: config.altura - 468,
      cb: this.carregarCaixaTarefa
    });

    this.definirAtivo({
      nome: 'botaoTarefaInativo',
      chave: 'btn-tasks-inactive',
      x: 500,
      y: config.altura - 468,
      cb: this.carregarCaixaTarefa
    });

    this.caixaDialogo = new CaixaModal(this.cena);
  }

  /**
   * Função auxiliar para adicionar ativos, adiciona imagem, configura o ouvinte de eventos
   * @param config : objeto com opções de configuração
   */
  definirAtivo(config) {
    this.btns[config.nome] = this.cena.add.image(config.x, config.y, config.chave)
      .setScrollFactor(0)
      .setInteractive({ useHandCursor: true })
      .setVisible(false);

    this.btns[config.nome].on('pointerdown', () => {
      config.cb(this);
    });
  }

  /**
   * Cria uma caixa modal com base no tipo passado
   * @param tipo : string com o tipo
   */
  criarCaixa(tipo) {
    this.tipo = tipo;

    if (this.tipo !== 'dialog' && this.tipo !== 'tasks') {
      return;
    }

    // define a propriedade gameConfig
    gameConfig.menuTarefaAberto = true;

    switch (this.tipo) {
      case 'dialog':
        this.carregarCaixaDialogo();
        break;
      case 'tasks':
        this.carregarBotoes();
        break;
    }
  }

  // A caixa de diálogo pega o objeto de diálogo,
  carregarCaixaDialogo() {
    this.esconderBotoes();

    // determina com quem o jogador está falando
    const spriteAlvo = gameConfig.overlapData.sprite;
    const tipo = spriteAlvo.tipoCriatura;
    const nome = spriteAlvo.nome;
    let texto;
    console.log(spriteAlvo);
    console.log(tipo);

    // diálogo de animal ou NPC
    switch (tipo) {
      case 'animal': {
        let opcoes = dialogoAnimais[nome].padrao;

        // anexa opções de diálogo adicionais, se encontrado um filhote
        if (gameConfig.encontrouBezerro) {
          opcoes.push(...dialogoAnimais[nome].adicional);
        }

        texto = this.indiceAleatorio(opcoes);
        break;
      }

      case 'npc': {
        break;
      }

      case 'interativo': {
        // se for uma placa, exiba a mensagem

        break;
      }
    }

    this.caixaDialogo.carregarCaixa(texto);
  }

  // obtém índice aleatório de uma matriz
  indiceAleatorio(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // carrega botões para visualizar Tarefas ou Status, por padrão, veja o Status primeiro
  carregarBotoes() {
    this.carregarCaixaStatus(this);
    this.btns.botaoStatus.setVisible(true);
    this.btns.botaoTarefaInativo.setVisible(true);
  }

  /**
   * Caixa de Tarefa com lista de tarefas ativas para completar
   * @param instancia : instância desta classe, já que estamos chamando esta função em setAsset()
   */
  carregarCaixaTarefa(instancia) {
    instancia.btns.botaoStatus.setVisible(false);
    instancia.btns.botaoStatusInativo.setVisible(true);

    instancia.btns.botaoTarefaInativo.setVisible(false);
    instancia.btns.botaoTarefa.setVisible(true);

    instancia.caixaDialogo.carregarCaixa('lista de todas as tarefas ativas');
  }

  /**
   * Caixa de Status com informações de data e status do animal
   * @param instancia : instância desta classe, já que estamos chamando esta função em setAsset()
   */
  carregarCaixaStatus(instancia) {
    instancia.btns.botaoTarefa.setVisible(false);
    instancia.btns.botaoTarefaInativo.setVisible(true);

    instancia.btns.botaoStatusInativo.setVisible(false);
    instancia.btns.botaoStatus.setVisible(true);

    // monta a informação atual do dia e status do animal
    const texto = `Dia: ${gameConfig.dia}<br>Status do Animal`;

    instancia.caixaDialogo.carregarCaixa(texto);
  }

  // esconde os botões de tarefa
  esconderBotoes() {
    this.btns.botaoStatus.setVisible(false);
    this.btns.botaoTarefa.setVisible(false);
    this.btns.botaoTarefaInativo.setVisible(false);
    this.btns.botaoStatusInativo.setVisible(false);
  }

  // esconde as caixas criadas
  esconderCaixa() {
    this.esconderBotoes();
    this.caixaDialogo.esconderCaixa();
    gameConfig.menuTarefaAberto = false;
  }

}
