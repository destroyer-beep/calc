import DataManager from "./DataManager.js";
import Render from "./Render.js";

const dataManager = new DataManager();
const render = new Render();

export default class Listener {
  addVariable() {
    const variableName = document.getElementById('variables__input_name');
    dataManager.addVariable({
                name: variableName.value, 
                value: NaN
            })
  }

  setVariable() {
    const variableInputName = document.getElementById('variables__input_name');
    const variableInputValue = document.getElementById('variables__input_value');
    let variable = {
      name: variableInputName.value,
      value: NaN
    }
    if (+variableInputValue.value || +variableInputValue.value === 0) {
      variable.value = variableInputValue.value
    } else {
      variable.value = dataManager.getVariable(variableInputValue.value).value
    }
    dataManager.setVariable(variable);
  }
  
    getVariable() {
      const variableName = document.getElementById('variables__input_name');
      const variable = dataManager.getVariable(variableName.value);
      render.renderVariables(variable);
    }

    getAllVariable() {
      const variables = dataManager.getAllVariable();
      render.renderVariables(variables);
    }

    addFunctionDoubleVariable() {
      const functionName = document.getElementById('function__input_name'); 
      const functionExpression = document.getElementById('expression_select'); 
      const inputVariableOne = document.getElementById('function__input_variable_one');
      const inputVariableSecond = document.getElementById('function__input_variable_second');
      
      const sampleFunction = {
        name: functionName.value,
        functionExpression: functionExpression.value,
        variableOneName: inputVariableOne.value,
        variableOne: null,
        variableSecondName: inputVariableSecond.value,
        variableSecond: null,
        cache: {
          variableOne: null,
          variableSecond: null,
          result: null
        },
        expression() {
          switch (this.functionExpression) {
        case '+':
            return +this.variableOne + +this.variableSecond;
        case '-': 
          return +this.variableOne - +this.variableSecond;
        case '/': 
          return +this.variableOne / +this.variableSecond;
        case '*': 
          return +this.variableOne * +this.variableSecond;
        case '=': 
          dataManager.setVariable({
            name: this.variableOneName,
            value: this.variableSecond
          });
          return this.variableSecond
        case ' ': 
          return this.variableOne;
      }
        },
        callFunction() {
          if(this.variableSecondName === '') {
            this.variableSecondName = this.variableOneName;
          }
          if(dataManager.getVariableFunction(this.variableOneName) === this.cache.variableOne && dataManager.getVariableFunction(this.variableSecondName) === this.cache.variableSecond) {
            return this.cache.result;
          } else {
            this.variableOne = dataManager.getVariableFunction(this.variableOneName);
            this.cache.variableOne = this.variableOne;
            this.variableSecond = dataManager.getVariableFunction(this.variableSecondName);
            this.cache.variableSecond = this.variableSecond;
            this.cache.result = this.expression();
            return this.cache.result;
          }
        }
      }

    if (!isNaN(+inputVariableOne.value)) {
      console.error('input variable one incorrect value');
      return;
    } else {
      sampleFunction.variableOne = dataManager.getVariableFunction(inputVariableOne.value);
    }

    if (!isNaN(+inputVariableSecond.value)) {
      sampleFunction.variableSecond = inputVariableSecond.value;
    } else {
      sampleFunction.variableSecond = dataManager.getVariableFunction(inputVariableSecond.value);
    }
      dataManager.addFunction(sampleFunction); 
    }

    getFunction() {
      const functionName = document.getElementById('function__input_name'); 
      let func = dataManager.getFunction(functionName.value);
      render.renderFunction(func);
    }

    getAllFunction() { 
      let func = dataManager.getAllFunction();
      render.renderFunction(func);
    }
}