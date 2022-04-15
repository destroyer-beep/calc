import data from "../data/data.js";
import { regExp } from "./RegExp/RegExp.js";

export default class DataManager {

    addVariable(newVariable) {
        if(!this.validationName(newVariable.name)) {
            console.error('error variable name')
            return;
        }

        for(let variable of data.variables) {
            if (variable.name === newVariable.name) {
                console.error('error add variable');
                return;
            }
        }

        for(let func of data.function) {
            if (func.name === newVariable.name) {
                console.error('error add variable');
                return;
            }
        }
        data.variables.push(newVariable);
        console.log('done add variable');
    }

    setVariable(variableParameters) {
        if(isNaN(variableParameters.value) && variableParameters.value !== 0) {
            console.error('error set variable');
            return;
        }

        for (let variable of data.variables) {
            if (variable.name === variableParameters.name) {
                variable.value = variableParameters.value;
                console.log('done set variable')
                return;
            }
        }
        console.error('error set variable');
        return NaN;
    }

    getVariable(name) {
        for(let value of data.variables) {
            if (name === value.name) {
                return value;
            }
        }
        console.error('error get variable')
        return NaN;
    }

    getAllVariable() {
            return data.variables;
            
    }

    addFunction(newFunction) {

        if(newFunction.variableOne !== null && newFunction.variableSecond !== null) {
            for (let value in data.function) {
            if(newFunction.name === value.name) {
                console.log('add error function')
                return;
            }
        }

        for(let variable of data.variables) {
            if (variable.name === newFunction.name) {
                console.error('error add function');
                return;
            }
        }

        data.function.push(newFunction);
        console.log('add done function')
        } else {
        console.error('error add function');
        return;
        }
    } 

    getFunction(name) {
        for(let value of data.function) {
            if (name === value.name) {
                return value;
            }
        }
        console.error('error get function');
        return NaN;
    }

    getAllFunction() {
            return data.function;
    }

    getVariableFunction(name) {
        if(this.getVariable(name)) {
            return this.getVariable(name).value;
        } else if (this.getFunction(name)) {
            return this.getFunction(name).callFunction();
        } else {
            console.error('variable not found')
            return undefined;
        }

    }

     validationName(variable) {
        if (regExp.test(variable)){
          return true;
        } else {
          return false;
        }
  }

}