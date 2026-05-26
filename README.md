# VSHopt App

Aplicação Spring Boot simples para exibir produtos de um repositório SQL.

## Visão geral

Este projeto implementa um repositório de produtos e um DAO usando Spring Boot e JDBC.
A aplicação carrega dados de um banco de dados externo usando configurações definidas em `application.properties` ou variáveis de ambiente.

## Estrutura do projeto

- `src/main/java`: código-fonte Java
- `src/main/resources`: recursos da aplicação
- `schema.sql`: cria a tabela `produto`
- `data.sql`: popula a tabela com dados de exemplo
- `application.properties.example`: exemplo de configuração local

## Pré-requisitos

- Java 21
- Maven (ou use o wrapper `mvnw.cmd` no Windows)
- Banco de dados compatível com JDBC (por padrão, PostgreSQL)

## Configuração

### 1. Copie o arquivo de exemplo

Copie o arquivo de exemplo para gerar sua configuração local:

```powershell
cd .\vshopt.app
copy src\main\resources\application.properties.example src\main\resources\application.properties
```

### 2. Configure a conexão JDBC

No arquivo `src/main/resources/application.properties`, atualize as propriedades ou defina variáveis de ambiente:

```properties
app.jdbc.url=jdbc:postgresql://localhost:5432/vshopt
app.jdbc.username=vshopt_user
app.jdbc.password=change_me
app.jdbc.driver=org.postgresql.Driver
```

Ou use variáveis de ambiente com os placeholders já configurados:

- `APP_JDBC_URL`
- `APP_JDBC_USERNAME`
- `APP_JDBC_PASSWORD`
- `APP_JDBC_DRIVER`

### 3. Ignore o arquivo local de configuração

O projeto já ignora `src/main/resources/application.properties` para evitar commit de credenciais locais.

## Banco de dados

O schema da tabela `produto` é definido em `src/main/resources/schema.sql`.
Os dados de exemplo são carregados a partir de `src/main/resources/data.sql`.

### Exemplo de tabela `produto`

- `id`: bigint
- `nome`: varchar
- `descricao`: text
- `preco`: numeric
- `categoria`: varchar
- `imagem`: varchar
- `estoque`: integer

## Build e execução

### Usando o wrapper Maven no Windows

```powershell
cd .\vshopt.app
.\mvnw.cmd -DskipTests package
.\mvnw.cmd spring-boot:run
```

### Usando Maven instalado globalmente

```powershell
cd .\vshopt.app
mvn -DskipTests package
mvn spring-boot:run
```

## Notas

- Se usar variáveis de ambiente, configure-as antes de iniciar o app.
- O projeto já inclui `spring.sql.init.mode=always` para executar `schema.sql` e `data.sql` automaticamente no startup.
- Se precisar remover arquivos sensíveis do Git, use `.gitignore` e `git rm --cached`.

## Comandos úteis

```powershell
# limpar e compilar
.\mvnw.cmd clean package

# rodar a aplicação
.\mvnw.cmd spring-boot:run
```

## Contato

Use este README como referência para configurar e executar o projeto localmente.
