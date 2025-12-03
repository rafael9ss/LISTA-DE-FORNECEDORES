# 🚀 Guia de Deployment - GitHub + Netlify

Este guia fornece instruções passo a passo para fazer deploy do projeto no Netlify usando GitHub.

## 📋 Pré-requisitos

- Conta no [GitHub](https://github.com)
- Conta no [Netlify](https://netlify.com)
- Git instalado no seu computador
- Node.js 22+ e pnpm instalados

## 🔧 Passo 1: Preparar o Projeto Localmente

### 1.1 Verificar se tudo está funcionando

```bash
cd catalogo_fornecedores_web
pnpm install
pnpm build
```

Se o build foi bem-sucedido, você verá uma pasta `dist/` criada.

### 1.2 Inicializar repositório Git

```bash
git init
git add .
git commit -m "Initial commit: Catálogo de Fornecedores"
```

## 📤 Passo 2: Enviar para GitHub

### 2.1 Criar repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Preencha os campos:
   - **Repository name:** `catalogo_fornecedores_web`
   - **Description:** `Plataforma web de fornecedores brasileiros para e-commerce`
   - **Visibility:** Public (para que o Netlify possa acessar)
3. Clique em "Create repository"

### 2.2 Fazer push do código

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/catalogo_fornecedores_web.git
git push -u origin main
```

Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub.

## 🌐 Passo 3: Configurar Netlify

### 3.1 Conectar GitHub ao Netlify

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Clique em "Add new site" → "Import an existing project"
3. Selecione "GitHub"
4. Autorize o Netlify a acessar sua conta GitHub
5. Selecione o repositório `catalogo_fornecedores_web`

### 3.2 Configurar build settings

Na tela de configuração do Netlify, preencha:

- **Base directory:** (deixe vazio)
- **Build command:** `pnpm build`
- **Publish directory:** `dist`

### 3.3 Deploy

Clique em "Deploy site" e aguarde o processo ser concluído.

Seu site estará disponível em uma URL como: `https://seu-site-aleatorio.netlify.app`

## 🎯 Passo 4: Configurar Domínio Customizado (Opcional)

1. No Netlify, acesse "Site settings" → "Domain management"
2. Clique em "Add custom domain"
3. Digite seu domínio (ex: `fornecedores.com.br`)
4. Siga as instruções para configurar os DNS records

## 🔄 Passo 5: Configurar Deploy Automático

O GitHub Actions já está configurado para fazer deploy automático a cada push para `main`.

Para ativar:

1. No Netlify, acesse "Site settings" → "Build & deploy"
2. Copie seu **Site ID** e **Auth Token**
3. No GitHub, acesse "Settings" → "Secrets and variables" → "Actions"
4. Adicione dois secrets:
   - `NETLIFY_SITE_ID`: Cole o Site ID do Netlify
   - `NETLIFY_AUTH_TOKEN`: Cole o Auth Token do Netlify

Agora, a cada push para `main`, o site será automaticamente construído e deployado!

## 📝 Atualizar o Site

Depois de configurado, para atualizar o site:

```bash
# Faça suas alterações
# ...

# Commit e push
git add .
git commit -m "Descrição das alterações"
git push origin main
```

O Netlify automaticamente:
1. Detectará o push
2. Fará o build do projeto
3. Deployará a nova versão

## 🐛 Troubleshooting

### Build falha no Netlify mas funciona localmente

**Solução:** Verifique se a versão do Node.js é compatível. No `netlify.toml`, está configurado Node 22.

### Site mostra erro 404 em rotas

**Solução:** O arquivo `netlify.toml` já está configurado com redirects para SPA. Se o problema persistir, verifique se o arquivo está na raiz do projeto.

### Mudanças não aparecem no site

**Solução:** 
1. Aguarde o build ser concluído (verifique em "Deploys" no Netlify)
2. Limpe o cache do navegador (Ctrl+Shift+Delete)
3. Acesse o site em modo anônimo

## 📊 Monitorar Deploys

No Netlify, você pode:
- Ver histórico de deploys em "Deploys"
- Verificar logs de build em "Deploy log"
- Ativar preview de PRs (Pull Requests)

## 🎉 Pronto!

Seu site está online e será automaticamente atualizado a cada push para o GitHub!

---

**Dúvidas?** Consulte a [documentação do Netlify](https://docs.netlify.com/) ou [documentação do GitHub](https://docs.github.com/).
