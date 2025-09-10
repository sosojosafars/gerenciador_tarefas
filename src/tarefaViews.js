import inquirer from "inquirer";

export const mostrarMenu = async () => {
  const { opcao } = await inquirer.prompt([
    {
      type: "list",
      name: "opcao",
      message: "Gerenciador de Tarefas",
      choices: [
        "Nova tarefa",
        "Listar tarefas",
        "Completar tarefa",
        "Remover tarefa",
        "Sair",
      ],
    },
  ]);
  return opcao;
};

export const coletarDadosTarefa = async () => {
  return inquirer.prompt([
    { type: "input", name: "titulo", message: "Título da tarefa:" },
    { type: "input", name: "descricao", message: "Descrição (opcional):" },
    {
      type: "input",
      name: "prazo",
      message: "Prazo (AAAA-MM-DD ou vazio):",
    },
  ]);
};

export const mostrarTarefas = (tarefas) => {
  console.log("\n Lista de Tarefas:");
  tarefas.forEach((t) => {
    console.log(`- ID: ${t.id}`);
    console.log(`  Título: ${t.titulo}`);
    console.log(`  Descrição: ${t.descricao || "N/A"}`);
    console.log(`  Completa: ${t.isCompleta ? "✅" : "❌"}`);
    if (t.agendamento) {
      console.log(`  Prazo: ${new Date(t.agendamento.dataLimite).toLocaleString()}`);
      console.log(`  Atrasada: ${t.agendamento.isAtrasado ? "Sim" : "Não"}`);
    }
    console.log("----");
  });
};

export const mostrarMensagem = (msg) => {
  console.log(`\n${msg}\n`);
};
