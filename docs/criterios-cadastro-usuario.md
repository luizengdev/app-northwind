# 👤 Cadastro de Usuário

## 📖 História de Usuário

- **Como** Visitante da plataforma
- **Quero** Me cadastrar informando meus dados pessoais e de acesso
- **Para** Criar uma conta e acessar o sistema

## 🎯 Critérios Funcionais

O sistema deve permitir cadastro informando:

- Nome completo
- E-mail
- Senha
- Confirmação de senha

Após cadastro com sucesso:

- Deve ser exibida mensagem de sucesso.
- O usuário deve ser redirecionado.

---

## 📋 Critérios de Aceite BDD

### Campo: Nome Completo

#### Critério 1 – Nome Completo Obrigatório

- **Dado** que estou no campo Nome
- **Quando** informo um valor vazio
- **Então** devo ver a mensagem "Nome completo é obrigatório"

#### Critério 2 – Nome Completo Muito Curto

- **Dado** que estou no campo Nome
- **Quando** informo um valor com menos de 3 caracteres
- **Então** devo ver a mensagem "Nome deve ter no mínimo 3 caracteres"

#### Critério 3 – Nome Completo com Números

- **Dado** que estou no campo Nome
- **Quando** informo um valor contendo números
- **Então** devo ver a mensagem "Nome deve conter apenas letras e espaços"

---

### Campo: E-mail

#### Critério 4 – E-mail Sem Domínio

- **Dado** que estou no campo E-mail
- **Quando** informo um valor sem domínio (ex.: "usuario@")
- **Então** devo ver a mensagem "E-mail inválido"

#### Critério 5 – E-mail Sem Identificação

- **Dado** que estou no campo E-mail
- **Quando** informo um valor sem identificação antes do "@" (ex.: "@dominio.com")
- **Então** devo ver a mensagem "E-mail inválido"

#### Critério 6 – E-mail Sem Arroba

- **Dado** que estou no campo E-mail
- **Quando** informo um valor sem o caractere "@"
- **Então** devo ver a mensagem "E-mail inválido"

#### Critério 7 – E-mail Duplicado

- **Dado** que estou no campo E-mail
- **Quando** informo um e-mail já cadastrado no sistema
- **Então** devo ver a mensagem "Email já cadastrado. Tente fazer login ou use outro email"

---

### Campo: Senha

#### Critério 8 – Senha Sem Letra Maiúscula

- **Dado** que estou no campo Senha
- **Quando** informo um valor sem nenhuma letra maiúscula
- **Então** devo ver a mensagem "Senha deve ter pelo menos uma letra maiúscula"

---

### Campo: Confirmação de Senha

#### Critério 9 – Confirmação de Senha Divergente

- **Dado** que preenchi o campo Senha
- **Quando** informo no campo Confirmação de Senha um valor diferente da Senha
- **Então** devo ver a mensagem "As senhas não coincidem"

---

### Fluxo de Sucesso

#### Critério 10 – Cadastro com Sucesso

- **Dado** que preenchi todos os campos corretamente
- **Quando** clico em "Cadastrar"
- **Então** devo ver a mensagem "Cadastro realizado com sucesso! Redirecionando..."
- **E** devo ser redirecionado para a próxima tela
