import inquirer from "inquirer";
import {
  criarTarefa,
  buscarTodasTarefas,
  atualizarTarefa,
  deletarTarefa,
} from "./tarefaModel.js";
import {
  adicionarAgendamento,
  atualizarStatusAgendamento,
  deletarAgendamentoPorTarefaId
} from "./agendamentoModel.js";
import {
  mostrarMenu,
  coletarDadosTarefa,
  mostrarTarefas,
  mostrarMensagem,
} from "./tarefaViews.js";

export const adicionarNovaTarefa = async () => {
  const dados = await coletarDadosTarefa();

  if (!dados.titulo || dados.titulo.trim() === "") {
    mostrarMensagem("Erro: O título da tarefa não pode ser vazio.");
    return;
  }

  try {
    const tarefa = await criarTarefa(dados);
    if (dados.prazo) {
      await adicionarAgendamento(tarefa.id, dados.prazo);
    }
    mostrarMensagem("Tarefa criada com sucesso!");
  } catch (error) {
    mostrarMensagem("Erro ao criar tarefa. Tente novamente.");
  }
};

export const listarTodasTarefas = async () => {
  await atualizarStatusAgendamento();
  const tarefas = await buscarTodasTarefas();
  mostrarTarefas(tarefas);
};

export const completarTarefa = async () => {
  const { id } = await inquirer.prompt([
    { type: "input", name: "id", message: "Digite o ID da tarefa a completar:" },
  ]);

  try {
    await atualizarTarefa(id, { isCompleta: true });
    mostrarMensagem("Tarefa concluída!");
  } catch (error) {
    mostrarMensagem("Erro ao completar tarefa. Verifique se o ID está correto.");
  }
};

export const removerTarefa = async () => {
  const { id } = await inquirer.prompt([
    { type: "input", name: "id", message: "Digite o ID da tarefa a remover:" },
  ]);

  try {
    await deletarAgendamentoPorTarefaId(id);

    await deletarTarefa(id);

    mostrarMensagem("Tarefa removida!");
  } catch (error) {
    console.error("Detalhes do erro ao remover tarefa:", error);
    mostrarMensagem("Erro ao remover tarefa. Verifique se o ID está correto.");
  }
};

export const iniciarApp = async () => {
  let sair = false;
  while (!sair) {
    const opcao = await mostrarMenu();
    switch (opcao) {
      case "Nova tarefa":
        await adicionarNovaTarefa();
        break;
      case "Listar tarefas":
        await listarTodasTarefas();
        break;
      case "Completar tarefa":
        await completarTarefa();
        break;
      case "Remover tarefa":
        await removerTarefa();
        break;
      case "Sair":
        sair = true;
        break;
    }
  }
};
