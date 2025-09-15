import { PrismaClient } from "@prisma/client";
import { isBefore } from "date-fns";

const prisma = new PrismaClient();

export const adicionarAgendamento = async (tarefaId, dataLimite) => {
  return prisma.agendamento.create({
    data: {
      tarefaId,
      dataLimite: new Date(dataLimite),
    },
  });
};

export const atualizarStatusAgendamento = async () => {
  const agendamentos = await prisma.agendamento.findMany();

  for (const agendamento of agendamentos) {
    const atrasado = isBefore(new Date(agendamento.dataLimite), new Date());
    await prisma.agendamento.update({
      where: { id: agendamento.id },
      data: { isAtrasado: atrasado },
    });
  }
};

export const deletarAgendamentoPorTarefaId = async (tarefaId) => {
  return prisma.agendamento.deleteMany({
    where: { tarefaId },
  });
};
