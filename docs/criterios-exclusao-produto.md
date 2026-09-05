# 🗑️ Exclusão de Produto

## 📖 História de Usuário

- **Como** Usuário autenticado
- **Quero** Excluir um produto da listagem
- **Para** Remover itens que não fazem mais parte do catálogo

## 🎯 Critérios Funcionais

O sistema deve permitir:

- Exibir confirmação antes da exclusão
- Cancelar a exclusão sem remover o produto
- Confirmar a exclusão de produtos da lista
- Validar que o produto removido não aparece mais na busca

Após confirmação de exclusão:

- O produto deve ser removido da listagem.
- Deve ser exibida mensagem de confirmação no fluxo da interface.
- A busca pelo nome removido deve retornar "Nenhum produto encontrado".

---

## 📋 Critérios de Aceite BDD

### Fluxo de Confirmação

#### Critério 1 – Diálogo de confirmação exibido ao clicar em excluir

- **Dado** que estou na tela de produtos
- **Quando** clico na ação de exclusão de um produto
- **Então** devo visualizar o modal de confirmação
- **E** o título deve ser "Confirmação"
- **E** devo ver os botões de confirmação e cancelamento

#### Critério 2 – Cancelamento da exclusão mantém o produto

- **Dado** que abri o diálogo de confirmação de exclusão
- **Quando** clico em cancelar
- **Então** o produto deve continuar presente na listagem
- **E** o nome do último produto deve permanecer inalterado

---

### Exclusão Confirmada

#### Critério 3 – Exclusão do último produto da página após confirmação

- **Dado** que estou na tela de produtos
- **Quando** confirmo a exclusão do último produto visível
- **Então** o produto removido não deve mais aparecer na listagem
- **E** ao buscar pelo nome do produto excluído, devo ver a mensagem "Nenhum produto encontrado"

#### Critério 4 – Exclusão do primeiro produto da página após confirmação

- **Dado** que estou na tela de produtos
- **Quando** confirmo a exclusão do primeiro produto visível
- **Então** o produto removido não deve mais aparecer na listagem
- **E** ao buscar pelo nome do produto excluído, devo ver a mensagem "Nenhum produto encontrado"

---

### Busca de Produto Removido

#### Critério 5 – Produto removido deve não ser encontrado na busca

- **Dado** que realizei a exclusão de um produto
- **Quando** pesquiso pelo nome do produto removido
- **Então** a aplicação deve exibir "Nenhum produto encontrado"

---

### Observação de Teste

Os cenários de exclusão cobrem a confirmação, o cancelamento e a remoção definitiva do produto, tanto no primeiro quanto no último item da listagem, conferindo consistência com a regra de busca e a experiência do usuário na tela de produtos.

---
