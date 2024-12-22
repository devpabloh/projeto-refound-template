// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const expensesQuatity = document.querySelector("aside header p span")

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")

// Capturando o evento de input para formatar o valor.
amount.oninput = ()=>{
    // Obtém o valor atual do input e remove os caracteres não numéricos.
    let value = amount.value.replace(/\D/g, "")

    // Transformar o valor em centavos (exemplo: 150 / 100 = 1.5 que é equivalente a R$ 1,50)
    value = Number(value) / 100
    
    // Atualiza o valor do input.
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
    // Formatando o valor no padrão BRL ( que é o real Brasileiro).
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
    // Retorna o valor formatado.
    return value
}

// Captura o evendo de submit do formulário para obter os valores.
form.onsubmit = (event)=>{
    // Previne o comportamento padrão de recarregar a página.
    event.preventDefault()

    // Cria um objeto com os detalhes da nova despesa.
    const newExpense = {
        id: new Date().getTime(),
        expensse: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(), 
    }

    // Chama a função que irá adicionar o item na lista.
    expenseAdd(newExpense)
}

// Adiciona um novo item na lista
function expenseAdd(newExpense){
    try{
    // Cria o elemento para adicionar o item(li) na lista(ul) de despesas.
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Cria o ícone da categoria.
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Cria info da despesa.
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // Cria o nome da despesa.
    const expensiveName = document.createElement("strong")
    expensiveName.textContent = newExpense.expense

    // Cria a categoria da despesa.
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adiciona nome e categoria na div das informações de despesa.
    expenseInfo.append(expensiveName, expenseCategory)

    // Criar o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount
    .toUpperCase()
    .replace("R$", "")}`

    //criando o ícone de remover
    const removerIcon = document.createElement("img")
    removerIcon.setAttribute("src", `img/remove.svg`)
    removerIcon.setAttribute("alt", "remover")
    removerIcon.classList.add("remove-icon")

    // Adiciona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removerIcon)

    // Adiciona o item na lista.
    expenseList.append(expenseItem)
    
    // Atualiza os totais
    updateTotals()
        
    }catch(error){
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}

// atualizar os totais (valor total e quantidade de itens na lista)
function updateTotals(){
    try {
        // Recuperar todos os itens (li) na lista (ul)
        const items = expenseList.children

        // Atualiza a quantidade de itens na lista
        expensesQuatity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`
        
    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar os totais")
    }
}
