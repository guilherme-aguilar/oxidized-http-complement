# Usar a imagem base do Node.js
FROM node:lts-alpine

# Instalar o pnpm globalmente
RUN npm install -g pnpm

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos package.json e pnpm-lock.yaml para o contêiner
COPY package*.json pnpm-lock.yaml ./

# Instalar as dependências do projeto usando pnpm
RUN pnpm install

# Copiar o restante dos arquivos do seu projeto para dentro do contêiner
COPY . .

# Gerar o cliente Prisma usando pnpm
RUN pnpm prisma generate

# Rodar as migrações do banco de dados usando pnpm
RUN pnpm prisma db push

# Expor a porta 3333, que é a porta padrão do seu aplicativo
EXPOSE 3333

# Definir o comando padrão para rodar o seu servidor
CMD ["pnpm", "start"]
