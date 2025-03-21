// script.js

let questaoAtual = 0;
let questoes = [];
let score = 0;
let questoesRespondidas = 0;
let questoesAcertadas = 0;

// Função para iniciar o jogo
function startGame() {
    const botoesMateria = document.querySelectorAll('.button');
    const caixasFlutuantes = document.querySelectorAll('.caixa-flutuante');
    const materias = document.querySelectorAll('.materia');

    botoesMateria.forEach(botao => {
        botao.addEventListener('click', () => {
            const id = botao.id;
            caixasFlutuantes.forEach(caixa => {
                caixa.classList.remove('show');
            });
            document.getElementById(`caixa-${id}`).classList.add('show');
        });
    });

    materias.forEach(materia => {
        materia.addEventListener('click', () => {
            const materiaSelecionada = materia.textContent;
            carregarConteudos(materiaSelecionada);
            navegarParaPagina2(materiaSelecionada);
        });
    });

    document.getElementById('confirmar-conteudo').addEventListener('click', () => {
        const conteudoSelecionado = document.getElementById('conteudo-selecionado').textContent;
        navegarParaPagina3(conteudoSelecionado);
    });

    document.getElementById('nova-partida').addEventListener('click', novaPartida);
    document.getElementById('sair-do-game').addEventListener('click', sairDoGame);
}

// Função para carregar os conteúdos da matéria selecionada
function carregarConteudos(materia) {
    const conteudos = buscarConteudosNoBancoDeDados(materia);
    exibirConteudosNaCaixaDeRolagem(conteudos);
}

// Função para buscar os conteúdos da matéria no banco de dados (Google Sheets)
function buscarConteudosNoBancoDeDados(materia) {
    // Lógica para acessar o Google Sheets e buscar os conteúdos da matéria
    // ...
    // Retorna um array com os conteúdos
    return ['Conteúdo 1', 'Conteúdo 2', 'Conteúdo 3']; // Substitua pelos dados reais
}

// Função para exibir os conteúdos na Caixa de Rolagem da Página 2
function exibirConteudosNaCaixaDeRolagem(conteudos) {
    const caixaRolagem = document.getElementById('caixa-rolagem');
    caixaRolagem.innerHTML = '';
    conteudos.forEach(conteudo => {
        const item = document.createElement('div');
        item.textContent = conteudo;
        item.addEventListener('click', () => {
            document.getElementById('conteudo-selecionado').textContent = conteudo;
        });
        caixaRolagem.appendChild(item);
    });
}

// Função para navegar para a Página 2
function navegarParaPagina2(materia) {
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'flex';
    document.getElementById('materia-selecionada').textContent = materia;
}

// Função para navegar para a Página 3
function navegarParaPagina3(conteudo) {
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page3').style.display = 'flex';
    carregarQuestoes(conteudo);
}

// Função para carregar as questões do Google Sheets
function carregarQuestoes(conteudo) {
    // Lógica para acessar o Google Sheets e buscar as questões do conteúdo
    // ...
    // Retorna um array com as questões
    questoes = buscarQuestoesNoBancoDeDados(conteudo);
    questaoAtual = 0;
    score = 0;
    questoesRespondidas = 0;
    questoesAcertadas = 0;
    exibirQuestao(questoes[questaoAtual]);
}

// Função para buscar as questões no banco de dados (Google Sheets)
function buscarQuestoesNoBancoDeDados(conteudo) {
    // Lógica para acessar o Google Sheets e buscar as questões do conteúdo
    // ...
    // Retorna um array com as questões
    return [
        {
            pergunta: 'Pergunta 1',
            respostas: ['Resposta A', 'Resposta B', 'Resposta C', 'Resposta D'],
            correta: 0
        },
        {
            pergunta: 'Pergunta 2',
            respostas: ['Resposta E', 'Resposta F', 'Resposta G', 'Resposta H'],
            correta: 2
        }
    ]; // Substitua pelos dados reais
}

// Função para exibir a questão na Página 3
function exibirQuestao(questao) {
    document.getElementById('questao').textContent = questao.pergunta;
    const botoesResposta = document.querySelectorAll('.resposta');
    botoesResposta.forEach((botao, index) => {
        botao.textContent = questao.respostas[index];
        botao.addEventListener('click', () => {
            verificarResposta(questao, index);
        });
    });
    document.getElementById('contador-questao').textContent = questaoAtual + 1;
}

// Função para verificar se a resposta está correta
function verificarResposta(questao, respostaIndex) {
    questoesRespondidas++;
    if (respostaIndex === questao.correta) {
        score += 10;
        questoesAcertadas++;
        document.getElementById('feedback').textContent = 'Resposta correta!';
        document.getElementById('feedback').style.color = 'green';
    } else {
        document.getElementById('feedback').textContent = 'Resposta incorreta!';
        document.getElementById('feedback').style.color = 'red';
    }
    questaoAtual++;
    if (questaoAtual < questoes.length) {
        exibirQuestao(questoes[questaoAtual]);
    } else {
        exibirTelaResultado();
    }
}

// Função para exibir a tela de resultado
function exibirTelaResultado() {
    document.getElementById('page3').style.display = 'none';
    document.getElementById('page4').style.display = 'flex';
    document.getElementById('questoes-respondidas').textContent = `Questões Respondidas: ${questoesRespondidas}`;
    document.getElementById('questoes-acertadas').textContent = `Questões Acertadas: ${questoesAcertadas}`;
    document.getElementById('pontuacao-total').textContent = `Pontuação Total: ${score}`;
}

// Função para iniciar uma nova partida
function novaPartida() {
    document.getElementById('page4').style.display = 'none';
    document.getElementById('page1').style.display = 'flex';
}

// Função para sair do jogo
function sairDoGame() {
    window.location.href = 'https://www.google.com'; // Redireciona para o Google (substitua pela sua URL)
}

// Chamar a função startGame quando a página carregar
window.onload = startGame;
