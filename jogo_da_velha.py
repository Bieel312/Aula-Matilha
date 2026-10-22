def imprimir_tabuleiro(tabuleiro):
    print(f" {tabuleiro[0]} | {tabuleiro[1]} | {tabuleiro[2]} ")
    print("---+---+---")
    print(f" {tabuleiro[3]} | {tabuleiro[4]} | {tabuleiro[5]} ")
    print("---+---+---")
    print(f" {tabuleiro[6]} | {tabuleiro[7]} | {tabuleiro[8]} ")

def verificar_vitoria(tabuleiro, jogador):
    vitorias = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], # linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], # colunas
        [0, 4, 8], [2, 4, 6]             # diagonais
    ]
    for condicao in vitorias:
        if tabuleiro[condicao[0]] == tabuleiro[condicao[1]] == tabuleiro[condicao[2]] == jogador:
            return True
    return False

def jogo_da_velha():
    tabuleiro = [" " for _ in range(9)]
    jogador_atual = "X"
    jogadas = 0

    print("Bem-vindo ao Jogo da Velha!")
    print("As posições são numeradas de 1 a 9, da esquerda para a direita, de cima para baixo:")
    imprimir_tabuleiro([1, 2, 3, 4, 5, 6, 7, 8, 9])
    print("-" * 30)

    while True:
        imprimir_tabuleiro(tabuleiro)
        try:
            escolha = int(input(f"Jogador {jogador_atual}, escolha uma posição (1-9): ")) - 1
            
            if escolha < 0 or escolha > 8 or tabuleiro[escolha] != " ":
                print("Jogada inválida. Tente novamente.")
                continue

            tabuleiro[escolha] = jogador_atual
            jogadas += 1

            if verificar_vitoria(tabuleiro, jogador_atual):
                imprimir_tabuleiro(tabuleiro)
                print(f"Parabéns! O jogador {jogador_atual} venceu!")
                break
            elif jogadas == 9:
                imprimir_tabuleiro(tabuleiro)
                print("Empate! O jogo deu velha.")
                break

            jogador_atual = "O" if jogador_atual == "X" else "X"
            
        except ValueError:
            print("Entrada inválida. Digite um número de 1 a 9.")

if __name__ == "__main__":
    jogo_da_velha()
