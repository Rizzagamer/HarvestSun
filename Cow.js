## Classe Vaca: Muuuuito Animê! 🐄

Esta classe estende a classe personalizada Sprite e traz as vacas da nossa fazenda à vida!

**O que ela faz:**

* Define as animações da vaca, incluindo comer (de frente e de lado), feliz (de lado), chocada (de lado), dormir (de frente e de lado).
* Usa spritesheets carregados na classe Background para cada animação.
* As animações usam loop infinito e efeito yoyo para um movimento natural.

**Como funciona:**

* O método `setAnimations` cria todas as animações da vaca:
    * `cow-eating-front`: Vaca comendo de frente, usando frames 0 e 1 do spritesheet "cow-eating-front".
    * `cow-eating-side`: Vaca comendo de lado, usando frames 0 e 1 do spritesheet "cow-eating-side".
    * `cow-happy-side`: Vaca feliz de lado, usando frames 0 e 1 do spritesheet "cow-happy-side".
    * `cow-shocked`: Vaca chocada, usando frames 0 e 1 do spritesheet "cow-shocked".
    * `cow-sleeping-front`: Vaca dormindo de frente, usando frames 0 e 1 do spritesheet "cow-sleeping-front".
    * `cow-sleeping-side`: Vaca dormindo de lado, usando frames 0 e 1 do spritesheet "cow-sleeping-side".
* Cada animação tem taxa de quadros de 6, loop infinito e efeito yoyo para a ação de ida e volta.



