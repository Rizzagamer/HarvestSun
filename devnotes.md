## Notas de Harvest Sun : Seja o melhor Fazendeiro

**Links:**

* Notas do Rex Rainbow sobre Phaser 3: [https://rexrainbow.github.io/phaser3-rex-notes/docs/site/](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/)
* Documentação do Phaser 3: [https://photonstorm.github.io/phaser3-docs/](https://photonstorm.github.io/phaser3-docs/)
* Laboratórios do Phaser 3: [http://labs.phaser.io/](http://labs.phaser.io/)

**Dimensões:**

* 1 pixel equivale a 5x5 pixels.

**Abas da caixa de diálogo:**

1. **Status do animal:** Mostra se você já alimentou e falou com o animal hoje.
2. **Tarefas:** Lista de tarefas ativas.
3. **Tarefas concluídas:** Lista de tarefas concluídas.

**Phaser: Objetos de cena e propriedades:**

* **MAP:** Contém o objeto Mapa.
* **ANIMS:** Armazena animações. Talvez seja melhor dividir e colocar em cada objeto sprite.
    * **animationAction:** Armazena a animação de ação a ser reproduzida ao pressionar ESPAÇO.
    * **pressedCursor:** // Acompanha o cursor pressionado anteriormente.
* **PLAYER / Arion**
* **SPRITES:** Armazena todos os sprites, incluindo Arion/Jogador.
    * **PNJs:**
        * **Moradores da cidade:**
            - Ann
            - Ellen
            - Nina
            - Eve
            - Cartomante
            - Florista
            - Prefeito
            - Esposa do Prefeito
            - Dono do Restaurante
        * **Montanheses:**
            - lenhador1
            - lenhador2
            - lenhador3
        * **Elfos da caverna:**
            - elfoDaCaverna1
            - elfoDaCaverna2
            - elfoDaCaverna3
            - elfoDaCaverna4
            - elfoDaCaverna5
        * **Espíritos da floresta:**
            - espiritoDaFloresta
            - Deusa
        * **Animais:**
            - vaca1
            - vaca2
            - vaca3
            - bezerro
            - galinha1
            - galinha2
            - galinha3
            - galinha4
            - filhote1
            - filhote2
            - filhote3
            - cachorro
            - cavalo
* **BTNS:** Armazena todos os botões interativos.
    * **taskBtn:** Botão de tarefa
    * **taskBtnInactive:** Botão de tarefa inativo
    * **statusBtn:** Botão de status
    * **statusBtnInactive:** Botão de status inativo
    * **closeBtn:** Botão Fechar
    * **scrollBtn:** Botão de rolagem
* **MODAL:** Tudo que gerencia a caixa
    * **mask:** Máscara
    * **maskBox:** Caixa da máscara
    * **textbox:** Caixa de texto
    * **box:** Caixa principal
* **UTILITY:** Gerenciadores e carregadores
    * **BoxManager:** Gerenciador de caixas
    * **ImageLoader:** Carregador de imagens
    * **ObjectLoader:** Carregador de objetos



