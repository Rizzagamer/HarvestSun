## Classe Sprite Ampliada

Esta classe estende a classe Sprite do Phaser e adiciona funcionalidades específicas para os nossos sprites no jogo.

**O que ela faz:**

* Recebe uma configuração, um nome e um tipo de criatura (animal, NPC etc.)
* Adiciona o sprite à cena e cria um retângulo de sobreposição para detectar interações
* Habilita física para o sprite e o retângulo, permitindo colisões
* Define o sprite como imóvel para evitar que o jogador empurre ele
* Corrige a origem do sprite para melhor alinhamento
* Define animações para o sprite (cada um deve implementar sua própria)
* Detecta a sobreposição do jogador com o sprite e ativa o diálogo
* Permite ações extras durante a sobreposição (cada um deve implementar sua própria)
* Executa qualquer código adicional na inicialização (cada um deve implementar sua própria)

**Parâmetros:**

* `config`: Objeto de configuração com dados como posição, chave de sprite e frame
* `name`: Nome identificador do sprite
* `creatureType`: Tipo de criatura (animal, NPC etc.)

**Métodos:**

* `init`: Inicializa o sprite, adicionando-o à cena, criando o retângulo de sobreposição, habilitando física, configurando colisões, definindo a origem, animando e detectando sobreposição com o jogador.
* `setAnimations`: Define as animações específicas para cada sprite (implementado individualmente).
* `overlapCallback`: Define ações adicionais que ocorrem quando o jogador se sobrepõe ao sprite (implementado individualmente).
* `extra`: Executa qualquer código adicional na inicialização do sprite (implementado individualmente).

**Em resumo,** esta classe facilita a criação de sprites interativos com animações, colisões e detecção de sobreposição, deixando o código mais organizado e enxuto.


