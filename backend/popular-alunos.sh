#!/bin/bash
# popular_banco.sh

# URL da API
API_URL="http://localhost:3001/api/alunos"

# Função para gerar IRA aleatório
gerar_ira() {
    echo "scale=2; $RANDOM/32767 * 10" | bc | awk '{printf "%.2f", $0}'
}

# Função para adicionar um aluno
adicionar_aluno() {
    nome=$1
    ira=$2
    curso=$3
    json=$(printf '{"nome": "%s", "ira": %s, "curso": "%s"}' "$nome" "$ira" "$curso")
    echo "Enviando: $json"
    curl -X POST $API_URL \
    -H "Content-Type: application/json" \
    -d "$json"
    echo -e "\nAluno adicionado: $nome"
}

# Array de cursos
cursos=("Engenharia de Software" "Ciência da Computação" "Design Digital" "Engenharia da Computação" "Redes de Computadores" "Sistemas de Informação")

# Adicionando alunos
adicionar_aluno "Mariana Silva" $(gerar_ira) "${cursos[0]}"
adicionar_aluno "Juliana Santos" $(gerar_ira) "${cursos[1]}"
adicionar_aluno "Rafaela Oliveira" $(gerar_ira) "${cursos[2]}"
adicionar_aluno "Ana Rodrigues" $(gerar_ira) "${cursos[3]}"
adicionar_aluno "Carlos Ferreira" $(gerar_ira) "${cursos[4]}"
adicionar_aluno "Bruno Costa" $(gerar_ira) "${cursos[5]}"
adicionar_aluno "Daniel Almeida" $(gerar_ira) "${cursos[0]}"
adicionar_aluno "Eduardo Pereira" $(gerar_ira) "${cursos[1]}"
adicionar_aluno "Fernanda Lima" $(gerar_ira) "${cursos[2]}"
adicionar_aluno "Gabriel Martins" $(gerar_ira) "${cursos[3]}"
adicionar_aluno "Helena Nunes" $(gerar_ira) "${cursos[4]}"
adicionar_aluno "Igor Cardoso" $(gerar_ira) "${cursos[5]}"
adicionar_aluno "Júlia Barbosa" $(gerar_ira) "${cursos[0]}"
adicionar_aluno "Leandro Gomes" $(gerar_ira) "${cursos[1]}"
adicionar_aluno "Marcela Sousa" $(gerar_ira) "${cursos[2]}"
adicionar_aluno "Natália Ribeiro" $(gerar_ira) "${cursos[3]}"
adicionar_aluno "Otávio Carvalho" $(gerar_ira) "${cursos[4]}"
adicionar_aluno "Patrícia Mendes" $(gerar_ira) "${cursos[5]}"
adicionar_aluno "Quintino Farias" $(gerar_ira) "${cursos[0]}"
adicionar_aluno "Renata Cavalcanti" $(gerar_ira) "${cursos[1]}"
adicionar_aluno "Sérgio Pinto" $(gerar_ira) "${cursos[2]}"
adicionar_aluno "Tatiana Moraes" $(gerar_ira) "${cursos[3]}"
adicionar_aluno "Ulisses Araújo" $(gerar_ira) "${cursos[4]}"
adicionar_aluno "Viviane Rocha" $(gerar_ira) "${cursos[5]}"
adicionar_aluno "Wagner Teixeira" $(gerar_ira) "${cursos[0]}"
adicionar_aluno "Xavier Borges" $(gerar_ira) "${cursos[1]}"

echo "População do banco de dados concluída!"