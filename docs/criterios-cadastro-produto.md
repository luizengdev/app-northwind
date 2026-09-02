# 📦 Cadastro de Novo Produto

## 📖 História de Usuário

- **Como** Usuário autenticado
- **Quero** Cadastrar um novo produto informando seus dados obrigatórios
- **Para** Disponibilizá-lo no catálogo da plataforma

## 🎯 Critérios Funcionais

O sistema deve permitir cadastro informando:

- SKU
- Nome
- Preço
- Estoque
- Categoria (via combobox)
- Fornecedor (via combobox)

Após cadastro com sucesso:

- O produto deve aparecer na listagem.
- Deve ser exibida mensagem de sucesso.

---

## 📋 Critérios de Aceite BDD

### Campo: Nome do Produto

#### Critério 1 – Nome do Produto Obrigatório

- **Dado** que estou no campo Nome
- **Quando** informo um valor vazio ou espaços
- **Então** devo ver a mensagem "Nome é obrigatório"

#### Critério 2 – Nome do Produto Muito Curto

- **Dado** que estou no campo Nome
- **Quando** informo um valor com menos de 6 caracteres
- **Então** devo ver a mensagem "Mínimo 6 caracteres"

#### Critério 3 – Nome do Produto Muito Longo

- **Dado** que estou no campo Nome
- **Quando** informo um valor com mais de 40 caracteres
- **Então** devo ver a mensagem "Máximo 40 caracteres"

#### Critério 4 – Nome do Produto com Números

- **Dado** que estou no campo Nome
- **Quando** informo um valor contendo números
- **Então** devo ver a mensagem "Não pode conter números"

#### Critério 5 – Nome do Produto com Caracteres Especiais

- **Dado** que estou no campo Nome
- **Quando** informo um valor com caracteres especiais (exceto espaços)
- **Então** devo ver a mensagem "Caracteres especiais não permitidos"

#### Critério 6 – Nome do Produto com Espaços Duplicados

- **Dado** que estou no campo Nome
- **Quando** informo um valor com espaços duplicados
- **Então** devo ver a mensagem "Não pode ter espaços duplicados"

---

### Campo: Preço

#### Critério 7 – Preço Obrigatório

- **Dado** que estou no campo Preço
- **Quando** informo um valor vazio
- **Então** devo ver a mensagem "Preço é obrigatório"

#### Critério 8 – Preço Inválido

- **Dado** que estou no campo Preço
- **Quando** informo um valor que não é número ou é menor/igual a zero
- **Então** devo ver a mensagem "Deve ser um valor positivo"

---

### Campo: Estoque

#### Critério 9 – Estoque Obrigatório

- **Dado** que estou no campo Estoque
- **Quando** informo um valor vazio
- **Então** devo ver a mensagem "Estoque é obrigatório"

#### Critério 10 – Estoque Inválido

- **Dado** que estou no campo Estoque
- **Quando** informo um valor que não é número ou está fora do intervalo 1-999
- **Então** devo ver a mensagem "Apenas números de 1 a 999"

---

### Campo: SKU

#### Critério 11 – SKU Obrigatório

- **Dado** que estou no campo SKU
- **Quando** informo um valor vazio ou espaços
- **Então** devo ver a mensagem "SKU é obrigatório"

#### Critério 12 – SKU com Tamanho Inválido

- **Dado** que estou no campo SKU
- **Quando** informo um valor com menos de 5 ou mais de 20 caracteres
- **Então** devo ver a mensagem "Deve ter entre 5 e 20 caracteres"

#### Critério 13 – SKU com Formato Inválido

- **Dado** que estou no campo SKU
- **Quando** informo um valor contendo caracteres diferentes de letras maiúsculas, números e hífen
- **Então** devo ver a mensagem "Apenas letras maiúsculas, números e hífen"

#### Critério 14 – SKU Não Começa com Letra

- **Dado** que estou no campo SKU
- **Quando** informo um valor que não começa com letra maiúscula
- **Então** devo ver a mensagem "Deve começar com letra maiúscula"

---

### Campos de Seleção (Combobox)

#### Critério 15 – Categoria Obrigatória

- **Dado** que estou no campo Categoria
- **Quando** não seleciono nenhuma categoria
- **Então** devo ver o campo destacado como obrigatório

#### Critério 16 – Fornecedor Obrigatório

- **Dado** que estou no campo Fornecedor
- **Quando** não seleciono nenhum fornecedor
- **Então** devo ver o campo destacado como obrigatório

---

### Fluxos de Sucesso e Comportamento da Interface

#### Critério 17 – Cadastro com Sucesso

- **Dado** que preenchi todos os campos corretamente
- **Quando** clico em "Adicionar"
- **Então** devo ver mensagem "Produto adicionado com sucesso!"
- **E** o modal deve fechar automaticamente
- **E** o produto deve aparecer na listagem
