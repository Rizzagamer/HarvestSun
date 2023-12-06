/**
 * Classe Base do Jogo,
 * - carrega todos os recursos
 * - carrega o Jogador e as ações/animacões do jogador
 * - cria o Mapa, define a câmera e limites do mundo
 * - cria as Saídas e gera itens (gerenciador de jogo)
 */

import Phaser from 'phaser';
import gameConfig from '../config/game-config';
import Mapa from '../classes/Mapa';
import ObjectLoader from '../classes/ObjectLoader';
import Jogador from '../sprites/Jogador';
import ImageLoader from '../classes/ImageLoader';
import BoxManager from '../classes/Box/BoxManager';

export default class Jogo extends Phaser.Scene {
  constructor() {
    super('Jogo');
  }

  init() {
    // console.log(gameConfig);

    // contêineres
    this._ANIMS = {
      cursorPressionado: 'baixo', // mantém o controle do cursor pressionado anteriormente
      animacaoAcao: '', // armazena a animação de ação a ser reproduzida ao pressionar a BARRA DE ESPAÇO
    };

    this._BTNS = {};
    this._INPUTS = {};
    this._MAPA = {};
    this._MODAL = {};
    this._JOGADOR = {};
    this._SPRITES = {};
    this._UTILITY = {};
  }

  preload() {
    new ImageLoader(this);
  }

  create() {
    const variaveisMapa = gameConfig.mapa[gameConfig.cenaCarregada];

    // cria mapa
    this._MAPA = new Mapa({
      scene: this,
      key: variaveisMapa.key,
      imgKey: variaveisMapa.imgKey,
      tileSetName: variaveisMapa.tileSetName,
      nomeCamadaBG: 'background', // todos os conjuntos de blocos têm uma camada "background"
      nomeCamadaBloqueada: 'blocked' // da mesma forma, todos têm "blocked"
    });

    // limites do mundo
    this.physics.world.bounds.width = variaveisMapa.limitesMapa.width;
    this.physics.world.bounds.height = variaveisMapa.limitesMapa.height;

    // com base no mapa anterior ( gameConfig.dadosAnteriores.cena ), determine os valores apropriados de x/y e o quadro
    const coordenadasJogador = this.definirCoordenadasJogador();
    const quadroJogador = this.definirDirecaoJogador();

    // cria Arion
    this._JOGADOR = new Jogador({
      scene: this,
      x: coordenadasJogador.x,
      y: coordenadasJogador.y,
      key: 'arion-em-pe',
      frame: quadroJogador
    });

    // limita a câmera ao tamanho do mapa
    this.cameras.main.setBounds(0, 0, variaveisMapa.limitesMapa.width, variaveisMapa.limitesMapa.height);
    this.cameras.main.startFollow(this._JOGADOR); // câmera segue o jogador

    // ativa as teclas de seta
    this._INPUTS = this.input.keyboard.createCursorKeys();

    // atribui teclas adicionais
    this._INPUTS.enter = this.input.keyboard.addKey(13);
    this._INPUTS.escape = this.input.keyboard.addKey(27);

    this.criarObjectLoader(); // gera itens
    this.criarOuvintesDeEventos(); // ouvintes de eventos

    // lida com a caixa modal para tarefas e status
    this._UTILITY.gerenciadorDeCaixa = new BoxManager(this);

    // console.log(this);
  }

  // loop de atualização
  update(tempo, delta) {
    // if ( gameConfig.menuTarefaAberto ) {
    //   gameConfig.pausarLoopDeAtualizacao = true;
    // } else {
    //   gameConfig.pausarLoopDeAtualizacao = false;
    // }

    // faz animações de caminhada se não estiver pausado
    if (!gameConfig.pausarLoopDeAtualizacao) {
      this.animacao_loop_de_atualizacao();
    }

    // se houver um sprite de sobreposição armazenado, verifica se está sobreposto
    if (gameConfig.dadosSobreposicao.isActive && Object.keys(gameConfig.dadosSobreposicao.sprite).length !== 0) {
      let estaSobreposto = Phaser.Geom.Intersects.RectangleToRectangle(this._JOGADOR.getBounds(), gameConfig.dadosSobreposicao.sobreposicao.getBounds());

      if (estaSobreposto) {
        gameConfig.dadosSobreposicao.isActive = true;
      } else {
        gameConfig.dadosSobreposicao.isActive = false;
        gameConfig.dadosSobreposicao.sprite = {};
      }
    }

  }

  // reproduz animação da chave passada
  reproduzirAnimacao(chaveAnimacao) {
    if (!this._JOGADOR.anims.isPlaying || this._JOGADOR.anims.currentAnim.key !== chaveAnimacao) {
      this._JOGADOR.anims.play(chaveAnimacao);
    }
  }

  // loop de atualização de animação
  animacao_loop_de_atualizacao() {
    if (this._INPUTS.down.isDown) {
      this._JOGADOR.body.setVelocityY(gameConfig.velocidadeJogador);
      this._JOGADOR.body.setVelocityX(0);
      this._ANIMS.cursorPressionado = 'baixo';
      this.reproduzirAnimacao('caminhando-baixo');
    } else if (this._INPUTS.up.isDown) {
      this._JOGADOR.body.setVelocityY(-gameConfig.velocidadeJogador);
      this._JOGADOR.body.setVelocityX(0);
      this._ANIMS.cursorPressionado = 'cima';
      this.reproduzirAnimacao('caminhando-cima');
    } else if (this._INPUTS.left.isDown) {
      this._JOGADOR.body.setVelocityX(-gameConfig.velocidadeJogador);
      this._JOGADOR.body.setVelocityY(0);
      this._ANIMS.cursorPressionado = 'esquerda';
      this.reproduzirAnimacao('caminhando-esquerda');
    } else if (this._INPUTS.right.isDown) {
      this._JOGADOR.body.setVelocityX(gameConfig.velocidadeJogador);
      this._JOGADOR.body.setVelocityY(0);
      this._ANIMS.cursorPressionado = 'direita';
      this.reproduzirAnimacao('caminhando-direita');
    } else {
      this.pararAnimacaoJogador();
    }
  }

  // interrompe a animação e a velocidade do jogador
  pararAnimacaoJogador() {
    this._JOGADOR.body.setVelocityY(0);
    this._JOGADOR.body.setVelocityX(0);
    this._JOGADOR.anims.stop();
  }

  // gerencia a geração de galinhas/itens
  criarObjectLoader() {
    this._UTILITY.ObjectLoader = new ObjectLoader({
      scene: this,
      camadasObjeto: this._MAPA.tilemap.objects
    });
    this._UTILITY.ObjectLoader.setup();
  }

  criarOuvintesDeEventos() {
    // eventos do teclado
    this.input.keyboard.on('keydown', function () {

      // ao pressionar ENTER, abre a caixa de diálogo para animais/pessoas/pontos de interesse
      if (this._INPUTS.enter.isDown && gameConfig.dadosSobreposicao.isActive) {
        // console.log(gameConfig);
        this._UTILITY.gerenciadorDeCaixa.createBox('dialogo');
      }

      // ao pressionar SHIFT, exibe os botões de Status do Animal / Tarefas Ativas
      else if (this._INPUTS.shift.isDown) {
        this._UTILITY.gerenciadorDeCaixa.createBox('tarefas');
      }

      // ESC fecha a caixa de diálogo aberta
      else if (this._INPUTS.escape.isDown) {
        this._UTILITY.gerenciadorDeCaixa.hideBox();
      }

      // se a tecla ESPAÇO for pressionada, reproduza a animação de Ação armazenada
      else if (this._INPUTS.space.isDown) {
        gameConfig.pausarLoopDeAtualizacao = true;
        this.pararAnimacaoJogador();

        switch (this._ANIMS.cursorPressionado) {
          case 'baixo':
            this.reproduzirAnimacao('anel-sino-baixo');
            break;
          case 'cima':
            this.reproduzirAnimacao('anel-sino-cima');
            break;
          case 'esquerda':
            this.reproduzirAnimacao('anel-sino-esquerda');
            break;
          case 'direita':
            this.reproduzirAnimacao('anel-sino-direita');
            break;
          default:
            this._JOGADOR.setTexture('arion-em-pe', 0);
        }
      }

      // depois de soltar a tecla ESPAÇO, reinicie o loop de atualização
      else if (this._INPUTS.space.isUp) {
        gameConfig.pausarLoopDeAtualizacao = false;
      }

      else {
        // gameConfig.pausarLoopDeAtualizacao = false;
      }

    }.bind(this));

    // ao completar a animação, define a textura em pé do jogador
    this._JOGADOR.on('animationcomplete', (animacao, quadro) => {
      switch (this._ANIMS.cursorPressionado) {
        case 'baixo':
          this._JOGADOR.setTexture('arion-em-pe', 0);
          break;
        case 'cima':
          this._JOGADOR.setTexture('arion-em-pe', 1);
          break;
        case 'esquerda':
          this._JOGADOR.setTexture('arion-em-pe', 2);
          break;
        case 'direita':
          this._JOGADOR.setTexture('arion-em-pe', 3);
          break;
        default:
          this._JOGADOR.setTexture('arion-em-pe', 0);
      }
    }, this);

  }

  // retorna o quadro para o sprite em pé do jogador
  definirDirecaoJogador() {
    switch (gameConfig.dadosAnteriores.direcao) {
      case 'baixo':
        return 0;
      case 'cima':
        return 1;
      case 'esquerda':
        return 2;
      case 'direita':
        return 3;
      default:
        return 0;
    }
  }

  // retorna as coordenadas de carregamento X/Y do jogador, com base na cena anterior
  definirCoordenadasJogador() {
    const cenaAnterior = gameConfig.dadosAnteriores.cena;
    const coordenadasJogador = gameConfig.mapa[gameConfig.cenaCarregada].posicaoInicialJogador;

    if (cenaAnterior.length > 0 && Object.keys(coordenadasJogador).length > 1) {
      return coordenadasJogador[cenaAnterior];
    } else {
      // senão, não existe cena anterior
      return coordenadasJogador.default;
    }
  }

}
