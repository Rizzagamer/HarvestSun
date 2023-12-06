/**
 * Exibe a Caixa Modal
 */

import config from '../../config';
import gameConfig from '../../config/game-config';

export default class CaixaModal {
  constructor(cena) {
    this.cena = cena;
    this.btns = this.cena._BTNS;
    this.modal = this.cena._MODAL;

    // configurações da caixa
    this.configuracaoCaixa = {
      altura: 400,
      largura: config.largura - 40,
      x: 20,
      y: (config.altura - 420), // 20px a partir do fundo
      corPreenchimento: 0x000000,
      alpha: 0.7
    };

    this.criarCaixa();
  }

  criarCaixa() {
    // criando gráficos
    // esta caixa será a caixa de menu arredondada
    this.modal.caixa = this.cena.add.graphics({
      fillStyle: {
        color: this.configuracaoCaixa.corPreenchimento,
        alpha: this.configuracaoCaixa.alpha,
      },
      lineStyle: {
        width: 6
      }
    }).setScrollFactor(0);

    // caixa que será uma máscara para o texto
    this.modal.caixaMascara = this.cena.add.graphics({
      fillStyle: {
        alpha: 1
      }
    }).setScrollFactor(0);

    // criando elementos interativos
    this.criarBotaoFechar();
    this.criarBotaoRolagem();

    // adicionando gráfico ao retângulo arredondado
    this.modal.caixa.fillRoundedRect(
      this.configuracaoCaixa.x,
      this.configuracaoCaixa.y,
      this.configuracaoCaixa.largura,
      this.configuracaoCaixa.altura,
      0
    );

    // contorno para o retângulo arredondado
    this.modal.caixa.strokeRoundedRect(
      this.configuracaoCaixa.x,
      this.configuracaoCaixa.y,
      this.configuracaoCaixa.largura,
      this.configuracaoCaixa.altura,
      0
    );

    // retângulo para a máscara de texto
    this.modal.caixaMascara.fillRoundedRect(
      this.configuracaoCaixa.x,
      this.configuracaoCaixa.y,
      this.configuracaoCaixa.largura,
      this.configuracaoCaixa.altura - 20,
      0
    );

    // oculta ao carregar o jogo
    this.esconderCaixa();
  }

  // criando botão Fechar
  criarBotaoFechar() {
    this.btns.botaoFechar = this.cena.add.image(config.largura - 50, config.altura - 390, 'botao-fechar')
      .setScrollFactor(0)
      .setInteractive({ useHandCursor: true });

    this.btns.botaoFechar.on('pointerdown', function () {
      gameConfig.menuTarefaAberto = false;
      this.esconderCaixa();
    }.bind(this));
  }

  criarBotaoRolagem() {
    this.btns.botaoRolagem = this.cena.add.image(config.largura - 50, config.altura - 45, 'botao-rolagem')
      .setScrollFactor(0)
      .setInteractive({ useHandCursor: true })
      .setVisible(false);

    this.btns.botaoRolagem.on('pointerdown', function (ponteiro) {
      console.log('clicado');
      console.log(ponteiro);
    });
  }

  adicionarTexto(texto) {
    this.modal.caixaTexto = this.cena.make.text({
      x: this.configuracaoCaixa.x,
      y: this.configuracaoCaixa.y,
      text: texto,
      style: {
        font: '55px monospace',
        padding: { x: 25, y: 25 },
        wordWrap: { width: 1220 },
      }
    }).setScrollFactor(0).setVisible(false);

    // cria uma máscara na caixa, mostrará apenas o texto
    this.modal.mascara = this.modal.caixaTexto.createBitmapMask();
    this.modal.caixaMascara.setMask(this.modal.mascara);
  }

  // exibe a caixa de pop-up
  carregarCaixa(texto) {
    this.adicionarTexto(texto);
    this.modal.caixa.setVisible(true);
    this.modal.caixaMascara.setVisible(true);
    this.btns.botaoFechar.setVisible(true);
    // this.btns.botaoRolagem.setVisible(true);
  }

  // esconde a caixa
  esconderCaixa() {
    this.modal.caixa.setVisible(false);
    this.modal.caixaMascara.setVisible(false);
    this.btns.botaoFechar.setVisible(false);
    // this.cena.botaoRolagem.setVisible(false);

    this.btns.botaoStatus.setVisible(false);
    this.btns.botaoStatusInativo.setVisible(false);
    this.btns.botaoTarefa.setVisible(false);
    this.btns.botaoTarefaInativo.setVisible(false);
  }

}
