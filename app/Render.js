const variablesDashboard = document.getElementById('variables__dashboard');
const functionDashboard = document.getElementById('function__dashboard');

export default class Render {
  renderVariables(variables) {

    if(variables instanceof Array) {
      variablesDashboard.innerHTML = '';
      for(let variable of variables) {
      let dataBox = document.createElement("div");
      dataBox.className = 'variables__data';
      let name = variable.name;
      let value = +variable.value;
      dataBox.textContent = `${name} : ${value.toFixed(2)}`;
      variablesDashboard.append(dataBox);
      }
    } else {
      variablesDashboard.innerHTML = '';
      let dataBox = document.createElement("div");
      dataBox.className = 'variables__data';
      let name = variable.name;
      let value = +variable.value;
      dataBox.textContent = `${name} : ${value.toFixed(2)}`;
      variablesDashboard.append(dataBox);
    }
  }

  renderFunction(functions) {
    if(functions instanceof Array) {
      functions.sort((a, b) => a.name > b.name ? 1 : -1);
      functionDashboard.innerHTML = '';
      for(let func of functions) {
      let dataBox = document.createElement("div");
      dataBox.className = 'function__data';
      let name = func.name;
      let value = +func.callFunction();
      dataBox.textContent = `${name} : ${value.toFixed(2)}`;
      functionDashboard.append(dataBox);
      }
    } else {
      functionDashboard.innerHTML = '';
      let dataBox = document.createElement("div");
      dataBox.className = 'function__data';
      let name = functions.name;
      let value = +functions.callFunction();
      dataBox.textContent = `${name} : ${value.toFixed(2)}`;
      functionDashboard.append(dataBox);
    }
  }
}