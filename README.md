# Eventmatch API

[![Build Status](https://travis-ci.org/brunosaantos/eventmatch-api.svg?branch=master)](https://travis-ci.org/brunosaantos/eventmatch-api)

API desenvolvida durante o TCC do curso de Análise e desenvolvimento de sistemas.

### Pré-requisitos

- NodeJS
- MySQL

```
$ cd nodejs
$ npm run start:dev
```

### Rodando em modo de desenvolvimento:

Por padrão a aplicação usará as seguintes configurações para realizar a conexão
com o banco de dados:

Usuário: "root"  
Senha: ""  
Host: "localhost"  
Database: "eventmatch_dev"  

Configurações diferentes podem ser passadas através das seguintes variáveis de ambiente:

Usuário: $EM_DB_USER  
Senha: $EM_DB_PASS  
Host: $EM_DB\_HOST  
Database: "eventmatch\_" + $NODE_ENV

Após configurar as credeciais de acesso ao banco execute os seguintes comandos:

```
$ cd nodejs
$ npm run start:dev
```

\* Em caso de erro certifique-se de que o banco em que está tentando conectar existe.

## Rodando os testes

```
$ npm test
```

\* Certifique-se que o banco "eventmatch_test" exista.
