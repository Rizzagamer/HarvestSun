## Carregador de Objetos (ObjectLoader)

Esta classe é responsável por carregar e posicionar objetos no mapa do jogo, 
e também por definir as colisões e interações com o jogador.

**Propriedades:**

* **scene:** Referência à cena atual do jogo
* **player:** Referência ao objeto do jogador
* **sprites:** Dicionário contendo todos os sprites do jogo
* **mapData:** Array de camadas de objetos criadas no Tiled
* **exitGroup:** Grupo de física contendo todos os objetos de saída
* **interactiveGroup:** Grupo de física contendo todos os objetos interativos

**Métodos:**

* **setup():**
    * Chama os métodos `parseMapData` e `setCollision` para inicializar os objetos e colisões
* **parseMapData():**
    * Itera sobre cada camada de objetos no `mapData`
    * Para a camada "exits":
        * Cria objetos de saída usando `addToPhysicsGroup` e adiciona-os ao `exitGroup`
    * Para a camada "animals":
        * Cria animais como vacas e galinhas
        * Instancia as classes Cow e Chicken com base nas informações do mapa
        * Adiciona os animais ao dicionário `sprites`
    * Para a camada "interactive":
        * Cria objetos interativos como comida, flores e sinais
        * Para sinais, usa a função `addToPhysicsGroup` para colisão
        * Para outros objetos, cria sprites com a chave correspondente
        * Adiciona os objetos interativos ao dicionário `sprites`
* **addToPhysicsGroup(obj, physicsGroup, layerName, keyName, type = ''):**
    * Cria um sprite a partir do objeto passado
    * Adiciona o sprite ao grupo de física especificado
    * Configura o sprite com propriedades como origin, nome e tipo
* **findPropValue(props, key):**
    * Busca e retorna o valor de uma propriedade específica em um array de propriedades
* **setCollision():**
    * Define as colisões para os objetos de saída e interativos
    * Utiliza o método `overlap` da física Arcade
    * Para objetos de saída, ao colidir com o jogador, carrega uma nova cena
    * Para objetos interativos, ao colidir com o jogador, ativa um estado de interação
* **newScene(sceneName):**
    * Atualiza o estado do jogo para a nova cena
    * Salva os dados da cena anterior
    * Reinicia a cena atual

**Correções ortográficas:**

* cena -> cena
* interativos -> interativos
* interativo -> interativo
* sprite -> sprite
* tipo -> tipo
* valor -> valor
* propriedade -> propriedade
* nome -> nome
* origin -> origin
* colisao -> colisão
* sobrepor -> sobrepor
* sobrepoem -> sobrepõe
* jogador -> jogador
* carregar -> carregar
* ativo -> ativo
* estado -> estado
* cena -> cena
* anterior -> anterior
* salvar -> salvar
* reiniciar -> reiniciar


