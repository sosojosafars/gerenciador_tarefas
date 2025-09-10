import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarTarefa = async (dadosTarefa) => {
  return prisma.tarefa.create({
    data: {
      titulo: dadosTarefa.titulo,
      descricao: dadosTarefa.descricao,
    },
  });
};

export const buscarTodasTarefas = async () => {
  return prisma.tarefa.findMany({
    include: { agendamento: true },
  });
};

export const atualizarTarefa = async (id, dados) => {
  return prisma.tarefa.update({
    where: { id },
    data: dados,
  });
};

export const deletarTarefa = async (id) => {
  return prisma.tarefa.delete({
    where: { id },
  });
};
