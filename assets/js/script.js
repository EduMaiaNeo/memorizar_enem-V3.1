// Configuração inicial
const pages = {
    page1: document.getElementById('page1'),
    page2: document.getElementById('page2'),
    page3: document.getElementById('page3'),
    page4: document.getElementById('page4')
};

let currentPage = 'page1';
let selectedProva = '';
let selectedConteudo = '';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let acertos = 0;
let questoesRespondidas = 0;

// Dados das matérias
const materias = {
    Matematica: ['Matemática Básica', 'Algebra', 'Geometria', 'Funções'],
    Linguagem: ['Linguagem'],
    Natureza: ['Biologia', 'Química', 'Física'],
    Humanas: ['Geografia', 'História'],
    Extras: ['Tabuada', 'Gramática', 'Redação', 'Vocabulary', 'Espanhol']
};

// URLs fictícias do Google Sheets (substituir pelas reais)
const googleSheets = {
    'Matemática Básica': 'memoriza-enem_prova_matematica_matematica-basica.gsheet',
    'Algebra': 'memoriza-enem_prova_matematica_algebra.gsheet',
    // Adicionar mais conforme necessário
};

/**
 * Alterna entre as páginas do jogo
 * @param {string} page - ID da página a ser exibida
 */
function switchPage(page) {
    Object.values(pages).forEach(p => p.classList.remove('active'));
    pages[page].classList.add('active');
    currentPage = page;
}

/**
 * Mostra a caixa flutuante com as matérias
 * @param {string} prova - Nome da prova selecionada
 */
function showFloatingBox(prova) {
    selectedProva = prova;
    const floatingBox = document.getElementById('floatingBox');
    floatingBox.innerHTML = '';
    materias[prova].forEach(materia => {
        const div = document.createElement('div');
        div.textContent = materia;
        div.style.cursor = 'pointer';
        div.onclick = () => selectMateria(materia);
        floatingBox.appendChild(div);
    });
    floatingBox.classList.remove('hidden');
}

/**
 * Seleciona a matéria e avança para a página 2
 * @param {string} materia - Nome da matéria selecionada
 */
function selectMateria(materia) {
    document.getElementById('floatingBox').classList.add('hidden');
    switchPage('page2');
    document.getElementById('materiaText').textContent = selectedProva;
    const scrollBox = document.getElementById('conteudosScroll');
    scrollBox.innerHTML = '';
    materias[selectedProva].forEach(conteudo => {
        const div = document.createElement('div');
        div.textContent = conteudo;
        div.style.cursor = 'pointer';
        div.onclick = () => {
            selectedConteudo = conteudo;
            document.getElementById('conteudoSelecionadoText').textContent = conteudo;
        };
        scrollBox.appendChild(div);
    });
}

/**
 * Carrega as questões do Google Sheets (simulado)
 */
function loadQuestions() {
    // Simulação de carregamento de dados do Google Sheets
    questions = [
        { questao: 'Qual é 2 + 2?', correta: '4', incorretas: ['3', '5', '6', '7'] },
        // Adicionar mais questões reais aqui
    ];
    return questions.length; // Retorna o número máximo de questões
}

/**
 * Inicia o jogo
 */
function startGame() {
    switchPage('page3');
    const maxQuestions = loadQuestions();
    currentQuestionIndex = 0;
    acertos = 0;
    questoesRespondidas = 0;
    score = 0;
    document.getElementById('questionCounter').textContent = `Questão ${currentQuestionIndex + 1}/${maxQuestions}`;
    document.getElementById('materiaTitle').textContent = selectedProva;
    document.getElementById('conteudoTitle').textContent = selectedConteudo;
    showQuestion();
}

/**
 * Exibe a questão atual
 */
function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }
    const question = questions[currentQuestionIndex];
    document.getElementById('questionBox').textContent = question.questao;
    const answersBox = document.getElementById('answersBox');
    answersBox.innerHTML = '';
    const allAnswers = [question.correta, ...question.incorretas].sort(() => Math.random() - 0.5);
    allAnswers.forEach(answer => {
        const btn = document.createElement('button');
        btn.innerHTML = `<img src="assets/img/botao_resposta_normal.png" alt="${answer}">`;
        btn.dataset.answer = answer;
        btn.onclick = () => checkAnswer(answer, question.correta, btn);
        answersBox.appendChild(btn);
    });
}

/**
 * Verifica a resposta selecionada
 * @param {string} selected - Resposta selecionada
 * @param {string} correct - Resposta correta
 * @param {HTMLElement} button - Botão clicado
 */
function checkAnswer(selected, correct, button) {
    questoesRespondidas++;
    if (selected === correct) {
        acertos++;
        button.querySelector('img').style.backgroundColor = 'green';
        document.getElementById('questionBox').style.backgroundColor = 'green';
        setTimeout(() => {
            currentQuestionIndex++;
            document.getElementById('questionCounter').textContent = `Questão ${currentQuestionIndex + 1}/${questions.length}`;
            showQuestion();
        }, 1000);
    } else {
        button.querySelector('img').style.backgroundColor = 'red';
    }
}

/**
 * Finaliza o jogo e calcula o score
 */
function endGame() {
    switchPage('page4');
    const porcentagemAcertos = (acertos / questoesRespondidas) * 100;
    const bonificacao = questoesRespondidas * 30; // Simplificação
    score = (porcentagemAcertos * 70) + bonificacao;
    document.getElementById('performanceBox').innerHTML = `
        Questões Respondidas: ${questoesRespondidas}<br>
        Acertos: ${acertos}<br>
        Pontuação Total: ${Math.round(score)}
    `;
}

// Eventos dos botões
document.getElementById('btnMatematica').addEventListener('click', () => {
    document.getElementById('btnMatematica').querySelector('img').src = 'assets/img/botao_matematica_clicado.png';
    setTimeout(() => showFloatingBox('Matematica'), 1000);
});
document.getElementById('btnLinguagem').addEventListener('click', () => {
    document.getElementById('btnLinguagem').querySelector('img').src = 'assets/img/botao_linguagem_clicado.png';
    setTimeout(() => showFloatingBox('Linguagem'), 1000);
});
document.getElementById('btnNatureza').addEventListener('click', () => {
    document.getElementById('btnNatureza').querySelector('img').src = 'assets/img/botao_natureza_clicado.png';
    setTimeout(() => showFloatingBox('Natureza'), 1000);
});
document.getElementById('btnHumanas').addEventListener('click', () => {
    document.getElementById('btnHumanas').querySelector('img').src = 'assets/img/botao_humanas_clicado.png';
    setTimeout(() => showFloatingBox('Humanas'), 1000);
});
document.getElementById('btnExtras').addEventListener('click', () => {
    document.getElementById('btnExtras').querySelector('img').src = 'assets/img/botao_extras_clicado.png';
    setTimeout(() => showFloatingBox('Extras'), 1000);
});

document.getElementById('btnConfirmarConteudo').addEventListener('click', () => {
    document.getElementById('btnConfirmarConteudo').querySelector('img').src = 'assets/img/botao_confirma-conteudo_clicado.png';
    setTimeout(startGame, 1000);
});

document.getElementById('returnToPage1').addEventListener('click', () => switchPage('page1'));
document.getElementById('returnToPage2').addEventListener('click', () => switchPage('page2'));

document.getElementById('btnNovaPartida').addEventListener('click', () => {
    document.getElementById('btnNovaPartida').querySelector('img').src = 'assets/img/botao_nova-partida_clicado.png';
    setTimeout(() => switchPage('page1'), 1000);
});

document.getElementById('btnSairGame').addEventListener('click', () => {
    document.getElementById('btnSairGame').querySelector('img').src = 'assets/img/botao_sair-game_clicado.png';
    setTimeout(() => window.close(), 1000); // Simula saída
});
