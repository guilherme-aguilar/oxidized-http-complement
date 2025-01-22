# Guia de Uso do Projeto

## Versão do Node Necessária
Este projeto requer o Node.js na versão 12 ou superior.

## Como Executar o Projeto
Para executar o projeto, siga os passos abaixo:

1. Clone o repositório em sua máquina local.
2. Navegue até o diretório do projeto.
3. Execute o comando `npm install` para instalar as dependências.
4. Execute o comando `npx prisma generate` para gerar os arquivos do Prisma.
5. Execute o comando `npm start` para iniciar o servidor.

## Instalação de Dependências
Para instalar as dependências do projeto, execute o comando `npm install`.

## Gerar Prisma e Criar o Banco de Dados
Para gerar os arquivos do Prisma e criar o banco de dados, execute os seguintes comandos:

1. Execute o comando `npx prisma generate` para gerar os arquivos do Prisma.
2. Execute o comando `npx prisma db push` para criar o banco de dados, caso ele ainda não exista.

Lembre-se de configurar as variáveis de ambiente no arquivo `.env` antes de iniciar o servidor.
