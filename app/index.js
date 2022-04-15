import Listener from "./Listener.js";

const listener = new Listener();

const buttonVariables = document.getElementById('variables__button');
const selectVariables = document.getElementById('variables_select');
const variableName = document.getElementById('variables__input_name');
const variableValue = document.getElementById('variables__input_value');
const buttonFunction = document.getElementById('function__button');
const selectFunction = document.getElementById('function_select');
const expressionSelect = document.getElementById('expression_select');
const functionVariableOne = document.getElementById('function__input_variable_one');
const functionVariableSecond = document.getElementById('function__input_variable_second');
const functionName = document.getElementById('function__input_name');

variableName.disabled = false;
variableValue.disabled = true;
functionVariableOne.disabled = false;
functionVariableSecond.disabled = true;
functionName.disabled = false;

selectVariables.addEventListener('change', () => {
  if(selectVariables.value === 'var' || selectVariables.value === 'print') {
    variableName.disabled = false;
    variableValue.disabled = true;
  } else if(selectVariables.value === 'let') {
    variableName.disabled = false;
    variableValue.disabled = false;
  } else if(selectVariables.value === 'printvars') {
    variableName.disabled = true;
    variableValue.disabled = true;
  }
});

buttonVariables.addEventListener('click', () => {
  switch(selectVariables.value) {
    case 'var': 
    listener.addVariable();
    break;
    case 'let': 
    listener.setVariable();
    break;
    case 'print': 
    listener.getVariable();
    break;
    case 'printvars': 
    listener.getAllVariable();
    break;
  }
variableName.value = '';
variableValue.value = '';
});

selectFunction.addEventListener('change', () => {
  if(selectFunction.value === 'fn') {
    functionName.disabled = false;
    functionVariableOne.disabled = false;
    functionVariableSecond.disabled = false;
    expressionSelect.disabled = false;
  } else if (selectFunction.value === 'print') {
    functionName.disabled = false;
    functionVariableOne.disabled = true;
    functionVariableSecond.disabled = true;
    expressionSelect.disabled = true;
  } else {
    functionName.disabled = true;
    functionVariableOne.disabled = true;
    functionVariableSecond.disabled = true;
    expressionSelect.disabled = true;
  }
})

expressionSelect.addEventListener('change', () => {
  if(expressionSelect.value === ' ') {
    functionVariableOne.disabled = false;
    functionVariableSecond.disabled = true;
    functionVariableSecond.value = '';
  } else {
    functionVariableOne.disabled = false;
    functionVariableSecond.disabled = false;
  }
})

buttonFunction.addEventListener('click', () => {
  switch(selectFunction.value) {
    case 'fn': 
    if(expressionSelect.value === ' ' && functionVariableOne.value && !functionVariableSecond.value) {
      listener.addFunctionDoubleVariable();
    } else if (
    expressionSelect.value === '+' ||
    expressionSelect.value === '-' ||
    expressionSelect.value === '/' ||
    expressionSelect.value === '*' ||
    expressionSelect.value === '=' &&
    functionVariableOne.value !== '' &&
    functionVariableSecond !== '') {
      listener.addFunctionDoubleVariable();
    } else {
      console.error('input function create error');
    }
    break;
    case 'print': 
    listener.getFunction();
    break;
    case 'printfns': 
    listener.getAllFunction();
    break;
  }
expressionSelect.value = '';
functionVariableOne.value = '';
functionVariableSecond.value = '';
functionName.value = '';
});