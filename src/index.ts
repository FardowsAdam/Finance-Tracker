interface Entry {
    source: string;
    amount: number;
    date: string;        
  }
  
  const incomes: Entry[] = [];
  const expenses: Entry[] = [];
  
  const incomeForm   = document.getElementById('incomeForm')  as HTMLFormElement;
  const expenseForm  = document.getElementById('expenseForm') as HTMLFormElement;
  const targetInput  = document.getElementById('targetInput') as HTMLInputElement;
  
  const incSource = document.getElementById('incSource') as HTMLInputElement;
  const incAmount = document.getElementById('incAmount') as HTMLInputElement;
  const incDate   = document.getElementById('incDate')   as HTMLInputElement;
  
  const expSource = document.getElementById('expSource') as HTMLInputElement;
  const expAmount = document.getElementById('expAmount') as HTMLInputElement;
  const expDate   = document.getElementById('expDate')   as HTMLInputElement;
  
  const incomeTableBody  = document.querySelector('#incomeTable tbody')  as HTMLTableSectionElement;
  const expenseTableBody = document.querySelector('#expenseTable tbody') as HTMLTableSectionElement;
  
  const incomeTotalCell  = document.getElementById('incomeTotal')  as HTMLElement;
  const expenseTotalCell = document.getElementById('expenseTotal') as HTMLElement;
  
  const balanceEl      = document.getElementById('balance')      as HTMLElement;
  const targetStatusEl = document.getElementById('targetStatus') as HTMLElement;
  
  
  const fmt = (n:number) => n.toLocaleString(undefined,{minimumFractionDigits:2});
  
 
  function renderEntryRow(entry: Entry): string {
    return `<tr><td>${entry.source}</td><td>${fmt(entry.amount)}</td><td>${entry.date}</td></tr>`;
  }
  
  function updateTables() {
   
    incomeTableBody.innerHTML  = incomes.map(renderEntryRow).join('');
    expenseTableBody.innerHTML = expenses.map(renderEntryRow).join('');
  
    const incTotal = incomes.reduce((sum, e) => sum + e.amount, 0);
    const expTotal = expenses.reduce((sum, e) => sum + e.amount, 0);
    const balance  = incTotal - expTotal;
  
    incomeTotalCell.textContent  = fmt(incTotal);
    expenseTotalCell.textContent = fmt(expTotal);
    balanceEl.textContent        = fmt(balance);
  
    updateTargetStatus(balance);
  }
  
  function updateTargetStatus(balance:number) {
    const target = Number(targetInput.value);
    if (!target) {
      targetStatusEl.textContent = 'No target set';
      targetStatusEl.className = 'warning';
      return;
    }
    const pct = balance / target;
    if (pct >= 1) {
      targetStatusEl.textContent = `Goal reached 🎉 (saved ${fmt(balance)})`;
      targetStatusEl.className = 'success';
    } else {
      targetStatusEl.textContent = `Progress: ${(pct*100).toFixed(1)} %`;
      targetStatusEl.className = 'warning';
    }
  }

  incomeForm.addEventListener('submit', e => {
    e.preventDefault();
    incomes.push({
      source: incSource.value.trim(),
      amount: Number(incAmount.value),
      date:   incDate.value,
    });
    incomeForm.reset();
    updateTables();
  });
  
  expenseForm.addEventListener('submit', e => {
    e.preventDefault();
    expenses.push({
      source: expSource.value.trim(),
      amount: Number(expAmount.value),
      date:   expDate.value,
    });
    expenseForm.reset();
    updateTables();
  });
  
  targetInput.addEventListener('input', () => updateTables());
  
  
  updateTables();
  