# Catálogo de Fornecedores Brasileiros

Uma plataforma web interativa para descobrir fornecedores brasileiros especializados em diversos nichos para e-commerce e dropshipping.

## 🎯 Características

- **30 Nichos de Produtos:** Eletrônicos, Roupas, Calçados, Cosméticos, Pet Shop, e muito mais
- **183+ Fornecedores:** Base de dados completa com informações de contato
- **Busca em Tempo Real:** Procure por empresa, produto ou localização
- **Links de Contato Funcionais:** Telefone, WhatsApp, Website, Instagram e Facebook
- **Design Responsivo:** Funciona perfeitamente em desktop, tablet e mobile
- **Interface Intuitiva:** Navegação por abas para explorar nichos

## 🚀 Como Usar

### Instalação Local

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/catalogo_fornecedores_web.git
   cd catalogo_fornecedores_web
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```

4. **Abra no navegador:**
   ```
   http://localhost:5173
   ```

### Build para Produção

```bash
pnpm build
```

A pasta `dist/` será criada com os arquivos otimizados para produção.

## 📦 Estrutura do Projeto

```
catalogo_fornecedores_web/
├── client/
│   ├── public/
│   │   ├── fornecedores_completo.json    # Dados dos fornecedores
│   │   └── fornecedores_contatos.json    # Informações de contato
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx                  # Página principal
│   │   ├── components/
│   │   ├── App.tsx                       # Componente raiz
│   │   └── index.css                     # Estilos globais
│   └── index.html
├── server/
│   └── index.ts                          # Servidor Express (produção)
├── package.json
└── README.md
```

## 🌐 Deployment no Netlify

### Opção 1: Deploy via GitHub (Recomendado)

1. **Faça push do projeto para o GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/catalogo_fornecedores_web.git
   git push -u origin main
   ```

2. **Conecte ao Netlify:**
   - Acesse [netlify.com](https://netlify.com)
   - Clique em "New site from Git"
   - Selecione seu repositório GitHub
   - Configure as seguintes opções:
     - **Build command:** `pnpm build`
     - **Publish directory:** `dist`
   - Clique em "Deploy site"

### Opção 2: Deploy Manual

1. **Faça o build:**
   ```bash
   pnpm build
   ```

2. **Arraste a pasta `dist/` para o Netlify:**
   - Acesse [netlify.com/drop](https://netlify.com/drop)
   - Arraste a pasta `dist/` para fazer upload
   - Seu site estará online em segundos!

## 🔧 Variáveis de Ambiente

Não há variáveis de ambiente obrigatórias para este projeto. É uma aplicação estática pura.

## 📝 Dados dos Fornecedores

Os dados estão organizados em dois arquivos JSON:

- **fornecedores_completo.json:** Contém informações sobre os 30 nichos e 183+ fornecedores
- **fornecedores_contatos.json:** Contém dados de contato (telefone, WhatsApp, website, redes sociais)

## 🎨 Personalização

### Alterar Cores
Edite `client/src/index.css` para modificar a paleta de cores.

### Adicionar Fornecedores
Edite `client/public/fornecedores_completo.json` e `client/public/fornecedores_contatos.json` com novos dados.

### Modificar Layout
Edite `client/src/pages/Home.tsx` para alterar a estrutura da página.

## 📱 Compatibilidade

- ✅ Chrome/Edge (últimas versões)
- ✅ Firefox (últimas versões)
- ✅ Safari (últimas versões)
- ✅ Mobile browsers

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para abrir issues ou pull requests.

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através do GitHub.

---

**Desenvolvido com ❤️ para empreendedores e e-commerce**
