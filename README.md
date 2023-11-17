# Projeto rides

Nosso projeto é composto de um backend escrito em python utilizando o framework FASTAPI, e um frontend utilizando HTML, CSS e Javascript. 

## Como rodar

1. Primeiramente devemos rodar o backend. Para isso abra a pasta backend:

`cd backend`

2. Instalar os pacotes necessários para rodar o projeto:

`pip install -r requirements.txt`

3. Iniciar o servidor:

`python app.py`

Com isso o servidor inicializará na porta http://0.0.0.0:8000/, no localhost do computador, deverá abrir no http://localhost:8000/rides. 

4. Para rodar o frontend, abra o arquivo index.html, encontrado na pasta frontend, em um navegador de sua escolha.


## Notas
 
1. No arquivo app.py está comentado na linha 92 a inicialização do Banco de Dados SQLite, pois, caso rode todas as vezes, irá limpar todas alterações feitas previamente. 

## Configurando o Ambiente Conda

Para garantir a reprodução do ambiente para este projeto, você pode seguir estas instruções para criar um ambiente Conda. Certifique-se de ter o Anaconda ou Miniconda instalado em seu sistema antes de começar.

1. Abra o terminal ou prompt de comando do Anaconda.

2. Navegue até o diretório do projeto usando o comando `cd`:

    ```bash
    cd caminho/rides/backend
    ```

3. Execute o seguinte comando para criar o ambiente a partir do arquivo `environment.yml`:

    ```bash
    conda env create -f environment.yml
    ```

4. Ative o ambiente recém-criado:

    ```bash
    conda activate rides
    ```

5. Agora, você está pronto para executar o projeto no ambiente Conda criado.

## Desativando o Ambiente Conda

Quando você terminar de trabalhar no projeto, você pode desativar o ambiente Conda usando o seguinte comando:

      ```bash
  conda deactivate
  ```

## Solução de Problemas

Se você encontrar problemas durante a criação do ambiente Conda, considere as seguintes etapas:

- **Remova Restrições de Versão:** Tente remover as restrições de versão para bibliotecas específicas no arquivo `environment.yml`.

- **Atualize o Conda:** Certifique-se de ter a versão mais recente do Conda instalada usando o comando:

    ```bash
    conda update conda
    ```