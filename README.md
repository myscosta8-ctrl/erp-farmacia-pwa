# ERP Farmácia PWA - Sistema de Gestão Comercial e Financeira

## 📱 Visão Geral

ERP web responsivo em formato PWA (Progressive Web App) para gestão profissional de farmácias/drogarias com foco em:

- ✅ Controle de Estoque Inteligente
- ✅ Vendas Fiscais e Não Fiscais
- ✅ PDV de Balcão Rápido
- ✅ Importação Automática de NF-e XML
- ✅ Automação Financeira Completa
- ✅ Alertas Inteligentes em Tempo Real
- ✅ Relatórios Fiscais Profissionais
- ✅ Produtividade Operacional Máxima

## 🛠️ Tecnologias

### Frontend
- React 18.x
- Tailwind CSS
- Shadcn UI
- Vite
- TypeScript
- PWA Support

### Backend
- Node.js + Express
- PostgreSQL 15+
- Prisma ORM
- JWT Authentication
- Winston Logging

## 🚀 Quick Start

### Com Docker (Recomendado)
```bash
git clone https://github.com/myscosta8-ctrl/erp-farmacia-pwa.git
cd erp-farmacia-pwa
docker-compose up -d
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- PostgreSQL: localhost:5432

### Manual
```bash
# Backend
cd backend
npm install
npx prisma migrate dev
npm run dev

# Frontend (novo terminal)
cd frontend
npm install
npm run dev
```

## 📊 Banco de Dados

50+ tabelas estruturadas:
- Autenticação e Usuários
- Produtos e Categorias
- Fornecedores
- Estoque e Movimentações
- Notas Fiscais e XMLs
- Contas a Pagar/Receber
- Vendas e Itens
- PDV e Sessões
- Alertas
- Auditoria

## 🎯 Funcionalidades

✅ Dashboard inteligente (4 visões)  
✅ Busca global em tempo real  
✅ Importação automática de XMLs  
✅ Contas a pagar automáticas  
✅ 3 tipos de venda  
✅ PDV profissional  
✅ Relatórios fiscais  
✅ Alertas inteligentes  
✅ 3 níveis de acesso  
✅ Responsividade 100%  

## 📁 Estrutura

```
erp-farmacia-pwa/
├── backend/          # Node.js Express
├── frontend/         # React PWA
└── docker-compose.yml
```

## 🔐 Segurança

- JWT Authentication
- Bcrypt Password Hashing
- CORS Configurado
- Rate Limiting
- Logs de Auditoria
- Validação de Entrada

## 🚀 Integrações Futuras

- NFC-e automático
- SEFAZ integrado
- PIX Dinâmico
- WhatsApp Business
- Aplicativo mobile
- BI integrado
- IA e Previsões

---

**Status**: Em Desenvolvimento  
**Versão**: 1.0.0