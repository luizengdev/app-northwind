# 🔎 Detalhes do Produto

## 📖 História de Usuário

- **Como** Usuário autenticado
- **Quero** Visualizar os detalhes de um produto cadastrado
- **Para** Confirmar informações do item antes de tomar uma ação ou imprimir os dados

## 🎯 Critérios Funcionais

O sistema deve permitir:

- Abrir o modal de detalhes ao clicar na ação correspondente
- Exibir os dados completos do produto selecionado
- Mostrar todos os campos relevantes do cadastro
- Permitir a ação de impressão em uma nova aba
- Fechar o modal corretamente após a interação do usuário

Após abrir o modal de detalhes:

- O produto deve estar visível em contexto de leitura
- Os campos de identificação e dados do produto devem estar presentes
- A ação de impressão deve abrir uma nova aba com o conteúdo do produto

---

## 📋 Critérios de Aceite BDD

### Acesso ao Modal de Detalhes

#### Critério 1 – Abrir modal de detalhes do primeiro produto da página

- **Dado** que estou na tela de produtos
- **Quando** clico na ação de visualização de detalhes do primeiro produto
- **Então** o modal de detalhes deve abrir
- **E** o título do modal deve ser exibido corretamente

#### Critério 2 – Abrir modal de detalhes do último produto da página

- **Dado** que estou na tela de produtos
- **Quando** clico na ação de visualização de detalhes do último produto
- **Então** o modal de detalhes deve abrir
- **E** o conteúdo correspondente ao produto selecionado deve ser exibido

---

### Campos Exibidos no Modal

#### Critério 3 – Exibir todos os campos do produto no modal

- **Dado** que abri o modal de detalhes de um produto
- **Quando** a interface for carregada
- **Então** devo visualizar os campos de ID
- **E** devo visualizar o campo SKU
- **E** devo visualizar o campo Nome
- **E** devo visualizar o campo Preço
- **E** devo visualizar o campo Estoque
- **E** devo visualizar o campo Categoria
- **E** devo visualizar o campo Fornecedor
- **E** devo visualizar o campo Slug

---

### Impressão de Detalhes

#### Critério 4 – Abrir nova aba ao clicar em Imprimir

- **Dado** que estou com o modal de detalhes aberto
- **Quando** clico no botão "Imprimir"
- **Então** uma nova aba deve ser aberta
- **E** a página impressa deve carregar corretamente
- **E** o título da aba deve conter "QA Automation Shop"

---

### Fluxo de Fechamento

#### Critério 5 – Fechar corretamente o modal de detalhes

- **Dado** que o modal de detalhes está aberto
- **Quando** clico na ação de fechar
- **Então** o modal deve ser fechado
- **E** a tela de produtos deve voltar a estar disponível para interação

---

### Observação de Teste

Os cenários de detalhes do produto cobrem a abertura do modal em diferentes posições da listagem, a validação da existência de todos os campos, a ação de impressão em nova aba e o fechamento do modal, garantindo que a visualização das informações do produto seja consistente e confiável para o usuário.
