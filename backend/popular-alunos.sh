#!/bin/bash

# popular_banco.sh

# URL da API
API_URL="http://localhost:3001/api/alunos"

# Função para adicionar um aluno
adicionar_aluno() {
    nome=$1
    ira=$2
    curso=$3
    
    curl -X POST $API_URL \
         -H "Content-Type: application/json" \
         -d "{\"nome\": \"$nome\", \"ira\": $ira, \"curso\": \"$curso\"}"
    
    echo -e "\nAluno adicionado: $nome"
}

# Adicionando alunos
adicionar_aluno "Barbie" 10 "Engenharia de Software"
adicionar_aluno "Ken" 9.5 "Ciência da Computação"
adicionar_aluno "Skipper" 8.7 "Sistemas de Informação"
adicionar_aluno "Stacie" 9.2 "Engenharia da Computação"
adicionar_aluno "Chelsea" 8.9 "Análise e Desenvolvimento de Sistemas"
adicionar_aluno "Midge" 9.8 "Inteligência Artificial"
adicionar_aluno "Teresa" 9.1 "Segurança da Informação"
adicionar_aluno "Raquelle" 8.5 "Jogos Digitais"
adicionar_aluno "Nikki" 9.3 "Redes de Computadores"
adicionar_aluno "Summer" 8.8 "Bioinformática"
adicionar_aluno "Daisy" 9.7 "Banco de Dados"
adicionar_aluno "Tutti" 8.6 "Engenharia de Software"
adicionar_aluno "Todd" 9.4 "Ciência da Computação"
adicionar_aluno "Antonio" 8.7 "Sistemas de Informação"
adicionar_aluno "Maria" 9.2 "Engenharia da Computação"
adicionar_aluno "João" 8.9 "Análise e Desenvolvimento de Sistemas"
adicionar_aluno "Pedro" 9.8 "Inteligência Artificial"
adicionar_aluno "Paulo" 9.1 "Segurança da Informação"
adicionar_aluno "Lucas" 8.5 "Jogos Digitais"
adicionar_aluno "Marcos" 9.3 "Redes de Computadores"
adicionar_aluno "Mariana" 8.8 "Bioinformática"
adicionar_aluno "Juliana" 9.7 "Banco de Dados"
adicionar_aluno "Ana" 8.6 "Engenharia de Software"

echo "População do banco de dados concluída!"