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
} from "./agendamentoModel.js";
import {
  mostrarMenu,
  coletarDadosTarefa,
  mostrarTarefas,
  mostrarMensagem,
} from "./tarefaViews.js";

export const adicionarNovaTarefa = async () => {
  const dados = await coletarDadosTarefa();
  const tarefa = await criarTarefa(dados);
  if (dados.prazo) {
    await adicionarAgendamento(tarefa.id, dados.prazo);
  }
  mostrarMensagem("Tarefa criada com sucesso!");
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
  await atualizarTarefa(id, { isCompleta: true });
  mostrarMensagem("Tarefa concluída!");
};

export const removerTarefa = async () => {
  const { id } = await inquirer.prompt([
    { type: "input", name: "id", message: "Digite o ID da tarefa a remover:" },
  ]);
  await deletarTarefa(id);
  mostrarMensagem("Tarefa removida!");
};

export const iniciarApp = async () => {
  let sair = false;
  while (!sair) {
    const opcao = await mostrarMenu();
    switch (opcao) {
      case "Criar nova tarefa":
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
