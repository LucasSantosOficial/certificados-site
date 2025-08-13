//para voltar pela página anterior


// Estado da aplicação
let currentUser = null;
let currentPage = 'login';

// Estados dos formulários
let formDataCorrida = {
    nomeCorretor: '',
    nomeCorrida: '',
    localCorrida: '',
    dataCorrida: '',
    distancia: '',
    unidadeDistancia: 'km',
    horaInicio: '',
    horaTermino: '',
    foto: null,
    notaPersonalizada: '',
    mensagemMotivacional: ''
};

let formDataPescaria = {
    nomePescador: '',
    nomeTorneio: '',
    localPescaria: '',
    dataPescaria: '',
    especiePeixe: '',
    especieOutra: '',
    pesoPeixe: '',
    unidadePeso: 'kg',
    comprimentoPeixe: '',
    unidadeComprimento: 'cm',
    horaCaptura: '',
    tecnicaPesca: '',
    equipamento: '',
    isca: '',
    fotoPescador: null,
    notaPescaria: '',
    mensagemPescaria: ''
};

let tempoCalculado = '';

// Elementos do DOM
const loginContainer = document.getElementById('login-container');
const mainContainer = document.getElementById('main-container');
const corridaContainer = document.getElementById('corrida-container');
const pescariaContainer = document.getElementById('pescaria-container');

// Função para mostrar/esconder páginas
function showPage(page) {
    // Esconder todas as páginas
    loginContainer.style.display = 'none';
    mainContainer.style.display = 'none';
    corridaContainer.style.display = 'none';
    pescariaContainer.style.display = 'none';
    
    // Mostrar página específica
    switch(page) {
        case 'login':
            loginContainer.style.display = 'block';
            break;
        case 'main':
            mainContainer.style.display = 'block';
            break;
        case 'corrida':
            corridaContainer.style.display = 'block';
            initCorridaForm();
            break;
        case 'pescaria':
            pescariaContainer.style.display = 'block';
            initPescariaForm();
            break;
    }
    currentPage = page;
}

// Função de login
function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        currentUser = {
            name: email.split('@')[0],
            email: email
        };
        document.getElementById('user-name').textContent = `Bem-vindo, ${currentUser.name}!`;
        showPage('main');
    } else {
        alert('Por favor, preencha email e senha.');
    }
}

// Função de acesso como visitante
function handleGuestAccess() {
    currentUser = {
        name: 'Visitante',
        email: 'guest@example.com'
    };
    document.getElementById('user-name').textContent = 'Bem-vindo, Visitante!';
    showPage('main');
}

// Função de logout
function handleLogout() {
    currentUser = null;
    showPage('login');
    // Limpar formulários
    resetFormData();
}

// Função para resetar dados dos formulários
function resetFormData() {
    formDataCorrida = {
        nomeCorretor: '',
        nomeCorrida: '',
        localCorrida: '',
        dataCorrida: '',
        distancia: '',
        unidadeDistancia: 'km',
        horaInicio: '',
        horaTermino: '',
        foto: null,
        notaPersonalizada: '',
        mensagemMotivacional: ''
    };
    
    formDataPescaria = {
        nomePescador: '',
        nomeTorneio: '',
        localPescaria: '',
        dataPescaria: '',
        especiePeixe: '',
        especieOutra: '',
        pesoPeixe: '',
        unidadePeso: 'kg',
        comprimentoPeixe: '',
        unidadeComprimento: 'cm',
        horaCaptura: '',
        tecnicaPesca: '',
        equipamento: '',
        isca: '',
        fotoPescador: null,
        notaPescaria: '',
        mensagemPescaria: ''
    };
    
    tempoCalculado = '';
}

// Inicialização do formulário de corrida
function initCorridaForm() {
    // Inputs do formulário
    const nomeCorretorInput = document.getElementById('nomeCorretor');
    const nomeCorrida = document.getElementById('nomeCorrida');
    const localCorrida = document.getElementById('localCorrida');
    const dataCorrida = document.getElementById('dataCorrida');
    const distancia = document.getElementById('distancia');
    const unidadeDistancia = document.getElementById('unidadeDistancia');
    const horaInicio = document.getElementById('horaInicio');
    const horaTermino = document.getElementById('horaTermino');
    const foto = document.getElementById('foto');
    const notaPersonalizada = document.getElementById('notaPersonalizada');
    const mensagemMotivacional = document.getElementById('mensagemMotivacional');
    
    // Botões
    const gerarPreviaBtn = document.getElementById('gerar-previa');
    const voltarMenuBtn = document.getElementById('voltar-menu-corrida');
    
    // Event listeners
    if (nomeCorretorInput) nomeCorretorInput.addEventListener('input', (e) => handleInputChangeCorrida('nomeCorretor', e.target.value));
    if (nomeCorrida) nomeCorrida.addEventListener('input', (e) => handleInputChangeCorrida('nomeCorrida', e.target.value));
    if (localCorrida) localCorrida.addEventListener('input', (e) => handleInputChangeCorrida('localCorrida', e.target.value));
    if (dataCorrida) dataCorrida.addEventListener('input', (e) => handleInputChangeCorrida('dataCorrida', e.target.value));
    if (distancia) distancia.addEventListener('input', (e) => handleInputChangeCorrida('distancia', e.target.value));
    if (unidadeDistancia) unidadeDistancia.addEventListener('change', (e) => handleInputChangeCorrida('unidadeDistancia', e.target.value));
    if (horaInicio) horaInicio.addEventListener('input', (e) => handleInputChangeCorrida('horaInicio', e.target.value));
    if (horaTermino) horaTermino.addEventListener('input', (e) => handleInputChangeCorrida('horaTermino', e.target.value));
    if (foto) foto.addEventListener('change', handleFileChangeCorrida);
    if (notaPersonalizada) notaPersonalizada.addEventListener('input', (e) => handleInputChangeCorrida('notaPersonalizada', e.target.value));
    if (mensagemMotivacional) mensagemMotivacional.addEventListener('change', (e) => handleInputChangeCorrida('mensagemMotivacional', e.target.value));
    
    if (gerarPreviaBtn) gerarPreviaBtn.addEventListener('click', gerarPreviaCorrida);
    if (voltarMenuBtn) voltarMenuBtn.addEventListener('click', () => showPage('main'));
    
    // Inicializar botões de prévia
    setTimeout(() => {
        const voltarEdicaoBtn = document.getElementById('voltar-edicao');
        const deletarPreviaBtn = document.getElementById('deletar-previa');
        const gerarPdfBtn = document.getElementById('gerar-pdf');
        
        if (voltarEdicaoBtn) voltarEdicaoBtn.addEventListener('click', voltarEdicaoCorrida);
        if (deletarPreviaBtn) deletarPreviaBtn.addEventListener('click', deletarPreviaCorrida);
        if (gerarPdfBtn) gerarPdfBtn.addEventListener('click', gerarPDFCorrida);
    }, 100);
}

// Inicialização do formulário de pescaria
function initPescariaForm() {
    // Inputs do formulário
    const nomePescadorInput = document.getElementById('nomePescador');
    const nomeTorneio = document.getElementById('nomeTorneio');
    const localPescaria = document.getElementById('localPescaria');
    const dataPescaria = document.getElementById('dataPescaria');
    const especiePeixe = document.getElementById('especiePeixe');
    const especieOutra = document.getElementById('especieOutra');
    const pesoPeixe = document.getElementById('pesoPeixe');
    const unidadePeso = document.getElementById('unidadePeso');
    const comprimentoPeixe = document.getElementById('comprimentoPeixe');
    const unidadeComprimento = document.getElementById('unidadeComprimento');
    const horaCaptura = document.getElementById('horaCaptura');
    const tecnicaPesca = document.getElementById('tecnicaPesca');
    const equipamento = document.getElementById('equipamento');
    const isca = document.getElementById('isca');
    const fotoPescador = document.getElementById('fotoPescador');
    const notaPescaria = document.getElementById('notaPescaria');
    const mensagemPescaria = document.getElementById('mensagemPescaria');
    
    // Botões
    const gerarPreviaBtn = document.getElementById('gerar-previa-pescaria');
    const voltarMenuBtn = document.getElementById('voltar-menu');
    
    // Event listeners
    if (nomePescadorInput) nomePescadorInput.addEventListener('input', (e) => handleInputChangePescaria('nomePescador', e.target.value));
    if (nomeTorneio) nomeTorneio.addEventListener('input', (e) => handleInputChangePescaria('nomeTorneio', e.target.value));
    if (localPescaria) localPescaria.addEventListener('input', (e) => handleInputChangePescaria('localPescaria', e.target.value));
    if (dataPescaria) dataPescaria.addEventListener('input', (e) => handleInputChangePescaria('dataPescaria', e.target.value));
    if (especiePeixe) {
        especiePeixe.addEventListener('change', (e) => {
            handleInputChangePescaria('especiePeixe', e.target.value);
            if (e.target.value === 'Outro') {
                especieOutra.style.display = 'block';
            } else {
                especieOutra.style.display = 'none';
                handleInputChangePescaria('especieOutra', '');
            }
        });
    }
    if (especieOutra) especieOutra.addEventListener('input', (e) => handleInputChangePescaria('especieOutra', e.target.value));
    if (pesoPeixe) pesoPeixe.addEventListener('input', (e) => handleInputChangePescaria('pesoPeixe', e.target.value));
    if (unidadePeso) unidadePeso.addEventListener('change', (e) => handleInputChangePescaria('unidadePeso', e.target.value));
    if (comprimentoPeixe) comprimentoPeixe.addEventListener('input', (e) => handleInputChangePescaria('comprimentoPeixe', e.target.value));
    if (unidadeComprimento) unidadeComprimento.addEventListener('change', (e) => handleInputChangePescaria('unidadeComprimento', e.target.value));
    if (horaCaptura) horaCaptura.addEventListener('input', (e) => handleInputChangePescaria('horaCaptura', e.target.value));
    if (tecnicaPesca) tecnicaPesca.addEventListener('change', (e) => handleInputChangePescaria('tecnicaPesca', e.target.value));
    if (equipamento) equipamento.addEventListener('input', (e) => handleInputChangePescaria('equipamento', e.target.value));
    if (isca) isca.addEventListener('input', (e) => handleInputChangePescaria('isca', e.target.value));
    if (fotoPescador) fotoPescador.addEventListener('change', handleFileChangePescaria);
    if (notaPescaria) notaPescaria.addEventListener('input', (e) => handleInputChangePescaria('notaPescaria', e.target.value));
    if (mensagemPescaria) mensagemPescaria.addEventListener('change', (e) => handleInputChangePescaria('mensagemPescaria', e.target.value));
    
    if (gerarPreviaBtn) gerarPreviaBtn.addEventListener('click', gerarPreviaPescaria);
    if (voltarMenuBtn) voltarMenuBtn.addEventListener('click', () => showPage('main'));
    
    // Inicializar botões de prévia
    setTimeout(() => {
        const voltarEdicaoBtn = document.getElementById('voltar-edicao-pescaria');
        const deletarPreviaBtn = document.getElementById('deletar-previa-pescaria');
        const gerarPdfBtn = document.getElementById('gerar-pdf-pescaria');
        
        if (voltarEdicaoBtn) voltarEdicaoBtn.addEventListener('click', voltarEdicaoPescaria);
        if (deletarPreviaBtn) deletarPreviaBtn.addEventListener('click', deletarPreviaPescaria);
        if (gerarPdfBtn) gerarPdfBtn.addEventListener('click', gerarPDFPescaria);
    }, 100);
}

// Funções de manipulação de dados - Corrida
function handleInputChangeCorrida(field, value) {
    formDataCorrida[field] = value;
    
    // Calcular tempo automaticamente quando início e término são preenchidos
    if (field === 'horaInicio' || field === 'horaTermino') {
        const tempo = calcularTempo(
            field === 'horaInicio' ? value : formDataCorrida.horaInicio,
            field === 'horaTermino' ? value : formDataCorrida.horaTermino
        );
        tempoCalculado = tempo;
        
        const tempoCalculadoDiv = document.getElementById('tempo-calculado');
        const tempoValorSpan = document.getElementById('tempo-valor');
        
        if (tempo && tempoCalculadoDiv && tempoValorSpan) {
            tempoCalculadoDiv.style.display = 'block';
            tempoValorSpan.textContent = tempo;
        } else if (tempoCalculadoDiv) {
            tempoCalculadoDiv.style.display = 'none';
        }
    }
}

function handleFileChangeCorrida(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            formDataCorrida.foto = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Funções de manipulação de dados - Pescaria
function handleInputChangePescaria(field, value) {
    formDataPescaria[field] = value;
}

function handleFileChangePescaria(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            formDataPescaria.fotoPescador = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Função para calcular tempo
function calcularTempo(inicio, termino) {
    if (!inicio || !termino) return '';
    
    const [horaInicio, minutoInicio] = inicio.split(':').map(Number);
    const [horaTermino, minutoTermino] = termino.split(':').map(Number);
    
    let totalMinutosInicio = horaInicio * 60 + minutoInicio;
    let totalMinutosTermino = horaTermino * 60 + minutoTermino;
    
    // Se o término for menor que o início, assumir que passou da meia-noite
    if (totalMinutosTermino < totalMinutosInicio) {
        totalMinutosTermino += 24 * 60;
    }
    
    const diferencaMinutos = totalMinutosTermino - totalMinutosInicio;
    const horas = Math.floor(diferencaMinutos / 60);
    const minutos = diferencaMinutos % 60;
    
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:00`;
}

// Função para formatar data
function formatarData(dataString) {
    if (!dataString) return '';
    
    const data = new Date(dataString + 'T00:00:00');
    return data.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });
}

// Funções de prévia - Corrida
function gerarPreviaCorrida() {
    if (!formDataCorrida.nomeCorretor || !formDataCorrida.nomeCorrida || !formDataCorrida.localCorrida) {
        alert('Por favor, preencha pelo menos o nome do corredor, nome da corrida e local.');
        return;
    }
    
    // Atualizar elementos do certificado
    document.getElementById('cert-local').textContent = formDataCorrida.localCorrida;
    document.getElementById('cert-data').textContent = formatarData(formDataCorrida.dataCorrida);
    document.getElementById('cert-nome-corrida').textContent = formDataCorrida.nomeCorrida;
    document.getElementById('cert-nome-corredor').textContent = formDataCorrida.nomeCorretor;
    document.getElementById('cert-distancia').textContent = `${formDataCorrida.distancia} ${formDataCorrida.unidadeDistancia}`;
    document.getElementById('cert-horario').textContent = `${formDataCorrida.horaInicio} - ${formDataCorrida.horaTermino}`;
    
    // Mostrar foto se existir
    const fotoContainer = document.getElementById('foto-container');
    const certFoto = document.getElementById('cert-foto');
    if (formDataCorrida.foto) {
        certFoto.src = formDataCorrida.foto;
        fotoContainer.style.display = 'block';
    } else {
        fotoContainer.style.display = 'none';
    }
    
    // Mostrar tempo se calculado
    const tempoCard = document.getElementById('tempo-card');
    const certTempo = document.getElementById('cert-tempo');
    if (tempoCalculado) {
        certTempo.textContent = tempoCalculado;
        tempoCard.style.display = 'block';
    } else {
        tempoCard.style.display = 'none';
    }
    
    // Mostrar nota personalizada se existir
    const notaContainer = document.getElementById('nota-personalizada-container');
    const certNota = document.getElementById('cert-nota-personalizada');
    if (formDataCorrida.notaPersonalizada) {
        certNota.textContent = formDataCorrida.notaPersonalizada;
        notaContainer.style.display = 'block';
    } else {
        notaContainer.style.display = 'none';
    }
    
    // Mostrar mensagem motivacional se existir
    const mensagemContainer = document.getElementById('mensagem-container');
    const certMensagem = document.getElementById('cert-mensagem');
    if (formDataCorrida.mensagemMotivacional) {
        certMensagem.textContent = formDataCorrida.mensagemMotivacional;
        mensagemContainer.style.display = 'block';
    } else {
        mensagemContainer.style.display = 'none';
    }
    
    // Mostrar prévia
    document.querySelector('#corrida-container > div').style.display = 'none';
    document.getElementById('preview-container').style.display = 'block';
}

function voltarEdicaoCorrida() {
    document.querySelector('#corrida-container > div').style.display = 'block';
    document.getElementById('preview-container').style.display = 'none';
}

function deletarPreviaCorrida() {
    formDataCorrida = {
        nomeCorretor: '',
        nomeCorrida: '',
        localCorrida: '',
        dataCorrida: '',
        distancia: '',
        unidadeDistancia: 'km',
        horaInicio: '',
        horaTermino: '',
        foto: null,
        notaPersonalizada: '',
        mensagemMotivacional: ''
    };
    tempoCalculado = '';
    
    showPage('main');
}

// Funções de prévia - Pescaria
function gerarPreviaPescaria() {
    if (!formDataPescaria.nomePescador || !formDataPescaria.nomeTorneio || !formDataPescaria.localPescaria) {
        alert('Por favor, preencha pelo menos o nome do pescador, nome do torneio e local.');
        return;
    }
    
    // Atualizar elementos do certificado
    document.getElementById('cert-local-pescaria').textContent = formDataPescaria.localPescaria;
    document.getElementById('cert-data-pescaria').textContent = formatarData(formDataPescaria.dataPescaria);
    document.getElementById('cert-nome-torneio').textContent = formDataPescaria.nomeTorneio;
    document.getElementById('cert-nome-pescador').textContent = formDataPescaria.nomePescador;
    
    // Espécie do peixe
    const especieTexto = formDataPescaria.especiePeixe === 'Outro' ? formDataPescaria.especieOutra : formDataPescaria.especiePeixe;
    document.getElementById('cert-especie').textContent = especieTexto;
    
    // Mostrar foto se existir
    const fotoContainer = document.getElementById('foto-container-pescaria');
    const certFoto = document.getElementById('cert-foto-pescaria');
    if (formDataPescaria.fotoPescador) {
        certFoto.src = formDataPescaria.fotoPescador;
        fotoContainer.style.display = 'block';
    } else {
        fotoContainer.style.display = 'none';
    }
    
    // Mostrar peso se preenchido
    const pesoCard = document.getElementById('peso-card');
    const certPeso = document.getElementById('cert-peso');
    if (formDataPescaria.pesoPeixe) {
        certPeso.textContent = `${formDataPescaria.pesoPeixe} ${formDataPescaria.unidadePeso}`;
        pesoCard.style.display = 'block';
    } else {
        pesoCard.style.display = 'none';
    }
    
    // Mostrar comprimento se preenchido
    const comprimentoCard = document.getElementById('comprimento-card');
    const certComprimento = document.getElementById('cert-comprimento');
    if (formDataPescaria.comprimentoPeixe) {
        certComprimento.textContent = `${formDataPescaria.comprimentoPeixe} ${formDataPescaria.unidadeComprimento}`;
        comprimentoCard.style.display = 'block';
    } else {
        comprimentoCard.style.display = 'none';
    }
    
    // Mostrar técnica se preenchida
    const tecnicaCard = document.getElementById('tecnica-card');
    const certTecnica = document.getElementById('cert-tecnica');
    if (formDataPescaria.tecnicaPesca) {
        certTecnica.textContent = formDataPescaria.tecnicaPesca;
        tecnicaCard.style.display = 'block';
    } else {
        tecnicaCard.style.display = 'none';
    }
    
    // Mostrar hora se preenchida
    const horaCard = document.getElementById('hora-card');
    const certHora = document.getElementById('cert-hora');
    if (formDataPescaria.horaCaptura) {
        certHora.textContent = formDataPescaria.horaCaptura;
        horaCard.style.display = 'block';
    } else {
        horaCard.style.display = 'none';
    }
    
    // Mostrar nota personalizada se existir
    const notaContainer = document.getElementById('nota-pescaria-container');
    const certNota = document.getElementById('cert-nota-pescaria');
    if (formDataPescaria.notaPescaria) {
        certNota.textContent = formDataPescaria.notaPescaria;
        notaContainer.style.display = 'block';
    } else {
        notaContainer.style.display = 'none';
    }
    
    // Mostrar mensagem motivacional se existir
    const mensagemContainer = document.getElementById('mensagem-container-pescaria');
    const certMensagem = document.getElementById('cert-mensagem-pescaria');
    if (formDataPescaria.mensagemPescaria) {
        certMensagem.textContent = formDataPescaria.mensagemPescaria;
        mensagemContainer.style.display = 'block';
    } else {
        mensagemContainer.style.display = 'none';
    }
    
    // Mostrar prévia
    document.querySelector('#pescaria-container > div').style.display = 'none';
    document.getElementById('preview-pescaria').style.display = 'block';
}

function voltarEdicaoPescaria() {
    document.querySelector('#pescaria-container > div').style.display = 'block';
    document.getElementById('preview-pescaria').style.display = 'none';
}

function deletarPreviaPescaria() {
    formDataPescaria = {
        nomePescador: '',
        nomeTorneio: '',
        localPescaria: '',
        dataPescaria: '',
        especiePeixe: '',
        especieOutra: '',
        pesoPeixe: '',
        unidadePeso: 'kg',
        comprimentoPeixe: '',
        unidadeComprimento: 'cm',
        horaCaptura: '',
        tecnicaPesca: '',
        equipamento: '',
        isca: '',
        fotoPescador: null,
        notaPescaria: '',
        mensagemPescaria: ''
    };
    
    showPage('main');
}

// Funções de geração de PDF
async function gerarPDFCorrida() {
    await gerarPDF('certificate', 'certificado-corrida', formDataCorrida.nomeCorretor || 'atleta');
}

async function gerarPDFPescaria() {
    await gerarPDF('certificate-pescaria', 'certificado-pescaria', formDataPescaria.nomePescador || 'pescador');
}

// Função genérica para gerar PDF
async function gerarPDF(certificateId, tipo, nome) {
    const certificateRef = document.getElementById(certificateId);
    if (!certificateRef) return;

    try {
        if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
        }
        await new Promise(r => setTimeout(r, 300));

        certificateRef.scrollIntoView({ block: 'center', inline: 'center' });

        const canvas = await html2canvas(certificateRef, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            scrollX: -window.scrollX,
            scrollY: -window.scrollY
        });

        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgProps = pdf.getImageProperties(imgData);
        const imgW = imgProps.width;
        const imgH = imgProps.height;

        const imgRatio = imgH / imgW;
        let renderWidth = pageWidth;
        let renderHeight = renderWidth * imgRatio;

        if (renderHeight > pageHeight) {
            renderHeight = pageHeight;
            renderWidth = renderHeight / imgRatio;
        }

        const x = (pageWidth - renderWidth) / 2;
        const y = (pageHeight - renderHeight) / 2;

        pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight);

        const fileName = `${tipo}-${nome.replace(/\s+/g, '-').toLowerCase()}.pdf`;

        pdf.save(fileName);
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert(`Erro ao gerar PDF: ${error.message}`);
    }
}

// Event listeners principais
document.addEventListener('DOMContentLoaded', function() {
    // Botões de login
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const guestBtn = document.getElementById('guest-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (loginBtn) loginBtn.addEventListener('click', handleLogin);
    if (registerBtn) registerBtn.addEventListener('click', () => alert('Funcionalidade de registro em desenvolvimento'));
    if (guestBtn) guestBtn.addEventListener('click', handleGuestAccess);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    
    // Cards de atividade
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        if (!card.classList.contains('coming-soon')) {
            card.addEventListener('click', function() {
                const activity = this.dataset.activity;
                if (activity) {
                    showPage(activity);
                }
            });
        }
    });
    
    // Enter para login
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && currentPage === 'login') {
            handleLogin();
        }
    });
    
    // Inicializar na página de login
    showPage('login');
});

