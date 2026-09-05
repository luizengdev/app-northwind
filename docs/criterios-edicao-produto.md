# ✏️ Edição de Produto

## 📖 História de Usuário

- **Como** Usuário autenticado
- **Quero** Editar um produto já cadastrado
- **Para** Atualizar dados e manter o catálogo correto

## 🎯 Critérios Funcionais

O sistema deve permitir edição informando:

- Nome
- Preço
- Estoque
- SKU
- Categoria
- Fornecedor

Após edição com sucesso:

- O produto deve ser atualizado na listagem.
- Deve ser exibida mensagem de sucesso.
- O modal deve fechar ou concluir a ação de edição.

---

## 📋 Critérios de Aceite BDD

### Campo: Nome do Produto

#### Critério 1 – Nome do Produto Obrigatório na Edição

- **Dado** que estou no modal de edição de um produto
- **Quando** informo um valor vazio no campo Nome
- **Então** devo ver a mensagem "Nome é obrigatório"

#### Critério 2 – Nome do Produto com Valor Válido na Edição

- **Dado** que estou no modal de edição de um produto
- **Quando** informo um nome válido
- **Então** o sistema deve aceitar a alteração e manter a regra de cadastro

---

### Campo: Preço

#### Critério 3 – Preço Obrigatório na Edição

- **Dado** que estou no modal de edição de um produto
- **Quando** informo um valor vazio no campo Preço
- **Então** devo ver a mensagem "Preço é obrigatório"

#### Critério 4 – Preço Válido na Edição

- **Dado** que estou no modal de edição de um produto
- **Quando** informo um valor positivo e válido
- **Então** o sistema deve aceitar a alteração

---

### Campo: Estoque

#### Critério 5 – Estoque Obrigatório na Edição

- **Dado** que estou no modal de edição de um produto
- **Quando** informo um valor vazio no campo Estoque
- **Então** devo ver a mensagem "Estoque é obrigatório"

#### Critério 6 – Estoque Válido na Edição

- **Dado** que estou no modal de edição de um produto
- **Quando** informo uma quantidade válida
- **Então** o sistema deve aceitar a alteração

---

### Campo: SKU

#### Critério 7 – SKU Obrigatório na Edição

- **Dado** que estou no modal de edição de um produto
- **Quando** informo um valor vazio no campo SKU
- **Então** devo ver a mensagem "SKU é obrigatório"

#### Critério 8 – SKU Válido na Edição

- **Dado** que estou no modal de edição de um produto
- **Quando** informo um SKU com formato válido
- **Então** o sistema deve aceitar a alteração

---

### Busca e Validação de Produto Inexistente

#### Critério 9 – Produto Inexistente não deve ser localizado

- **Dado** que estou na tela de produtos
- **Quando** pesquiso pelo nome "Produto Inexeistente QA 9999"
- **Então** devo ver a mensagem "Nenhum produto encontrado"

---

### Fluxo de Sucesso da Edição

#### Critério 10 – Edição com Sucesso para Produto Cadastrado

- **Dado** que seleciono um produto existente
- **Quando** altero o nome para "Produto Controle Editado triplo" e o preço para "40.00"
- **Então** devo ver a mensagem "Produto editado com sucesso!"
- **E** o produto atualizado deve aparecer na listagem com o novo nome

#### Critério 11 – Edição com Sucesso após Cadastro Rápido

- **Dado** que cadastro rapidamente um produto com os dados de pré-condição
- **Quando** edito o nome para "Produto Edicao Confirmada" e o preço para "30.00"
- **Então** devo ver a mensagem "Produto editado com sucesso!"
- **E** o produto deve seguir exibido corretamente na listagem
