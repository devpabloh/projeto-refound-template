// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

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

    // Adiciona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo)

    // Adiciona o item na lista.
    expenseList.append(expenseItem)
    
        
    }catch(error){
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}
