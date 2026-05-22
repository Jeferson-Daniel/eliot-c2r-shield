import 'dotenv/config';
import { prisma } from './db/prisma';

async function main() {
  console.log('Iniciando seed...');

  await prisma.usuario_insignia.deleteMany();
  await prisma.anexo_incidente.deleteMany();
  await prisma.incidente.deleteMany();
  await prisma.insignia.deleteMany();
  await prisma.usuario.deleteMany();

  const user1 = await prisma.usuario.create({
    data: {
      id_usuario: 1,
      nome: 'João Silva',
      matricula: '20231014040011',
      cargo: 'Discente',
      pontuacao_total: 50
    }
  });

  const user2 = await prisma.usuario.create({
    data: {
      id_usuario: 2,
      nome: 'Maria Souza',
      matricula: '1234567',
      cargo: 'Docente',
      pontuacao_total: 120
    }
  });

  const validador = await prisma.usuario.create({
    data: {
      id_usuario: 3,
      nome: 'Carlos Alberto',
      matricula: '9876543',
      cargo: 'Técnico CTIC',
      pontuacao_total: 200
    }
  });

  const user3 = await prisma.usuario.create({
    data: {
      id_usuario: 4,
      nome: 'Ana Clara',
      matricula: '20221014040022',
      cargo: 'Discente',
      pontuacao_total: 10
    }
  });

  const insignia1 = await prisma.insignia.create({
    data: {
      id_insignia: 1,
      titulo_insignia: 'Guardião Digital',
      caminho_icone: '/icons/guardiao.png',
      pontuacao_necessaria: 100
    }
  });

  const insignia2 = await prisma.insignia.create({
    data: {
      id_insignia: 2,
      titulo_insignia: 'Olhos de Águia',
      caminho_icone: '/icons/aguia.png',
      pontuacao_necessaria: 50
    }
  });

  const insignia3 = await prisma.insignia.create({
    data: {
      id_insignia: 3,
      titulo_insignia: 'Especialista Anti-Phishing',
      caminho_icone: '/icons/phishing.png',
      pontuacao_necessaria: 150
    }
  });

  await prisma.usuario_insignia.createMany({
    data: [
      { id_usuario: 1, id_insignia: 2 },
      { id_usuario: 2, id_insignia: 1 },
      { id_usuario: 3, id_insignia: 3 },
    ]
  });

  const inc1 = await prisma.incidente.create({
    data: {
      id_incidente: 1,
      titulo: 'Phishing SIGAA',
      descricao: 'Recebi um e-mail falso se passando pela STI solicitando minha senha do SIGAA.',
      link_suspeito: 'http://sigaa-ufpa-falso.com/login',
      status_validacao: 'Validado',
      ameaca: 'Phishing',
      pontos_atribuidos: 50,
      id_usuario_relator: 1,
      id_usuario_validador: 3,
    }
  });

  await prisma.anexo_incidente.create({
    data: {
      id_anexo: 1,
      id_incidente: 1,
      caminho_arquivo_storage: '/storage/incidentes/phishing_sigaa.png',
      hash_md5_arquivo: 'a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7'
    }
  });

  await prisma.incidente.create({
    data: {
      id_incidente: 2,
      titulo: 'PIX Falso Reitoria',
      descricao: 'Mensagem no WhatsApp usando a logo da universidade cobrando taxa de matrícula via PIX.',
      status_validacao: 'Pendente',
      ameaca: 'Engenharia Social',
      id_usuario_relator: 2,
    }
  });

  await prisma.incidente.create({
    data: {
      id_incidente: 3,
      titulo: 'Drive Institucional Exposto',
      descricao: 'Pasta do Google Drive com documentos sensíveis configurada como pública para qualquer pessoa com o link.',
      link_suspeito: 'https://drive.google.com/drive/folders/exposto',
      status_validacao: 'Resolvido',
      ameaca: 'Vazamento',
      pontos_atribuidos: 120,
      id_usuario_relator: 2,
      id_usuario_validador: 3,
    }
  });

  await prisma.incidente.create({
    data: {
      id_incidente: 4,
      titulo: 'QR Code Suspeito no Campus',
      descricao: 'Cartaz colado no mural oferecendo vagas de estágio com um QR Code que baixa um APK suspeito.',
      status_validacao: 'Validado',
      ameaca: 'Malware',
      pontos_atribuidos: 10,
      id_usuario_relator: 4,
      id_usuario_validador: 3,
    }
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
