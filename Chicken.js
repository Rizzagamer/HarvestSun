## Classe Galinha: Cocoricando pela Fazenda!

Esta classe estende a classe personalizada Sprite e dá vida às galinhas do nosso jogo.

**O que ela faz:**

* Define as animações da galinha, incluindo andar para frente, para trás, para o lado e dormir.
* Utiliza spritesheets carregados na classe Background para cada animação.
* As animações de caminhada usam loop infinito e efeito yoyo para simular movimento natural.

**Como funciona:**

* O método `setAnimations` cria todas as animações da galinha:
    * `chicken-walking-front`: Andar para frente usando frames 0 e 1 do spritesheet "chicken-walking".
    * `chicken-walking-back`: Andar para trás usando frames 2 e 3 do spritesheet "chicken-walking".
    * `chicken-walking-side`: Andar para o lado usando frames 4 e 5 do spritesheet "chicken-walking".
    * `chicken-sleeping`: Dormir usando frames 0 e 1 do spritesheet "chicken-sleeping".
* Cada animação tem taxa de quadros de 6, loop infinito e efeito yoyo para o movimento de ida e volta.


