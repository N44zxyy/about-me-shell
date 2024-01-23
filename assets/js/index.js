function updateScroll(){
  let element = document.getElementById("screen");
  element.scrollTop = element.scrollHeight;
}

function generateLine(text,html){
  let line = document.createElement("div");
  line.className = "line";
  if(html){
    line.innerHTML = text;
  }else{
    line.innerText = text;
  }
 
  return line;
}

function insertLine(text,html =false){
  let newLine = generateLine(text,html);
  $("#screen").append(newLine);
  updateScroll();
  return newLine;
}

function loading(){
  console.log("Loading");
  let insertedLine = insertLine("$ Loading console");
  let counter = 0;

  loadingMessage = () =>{
    if(counter == 5){
      clearInterval(interval);
      $('#input').prop('disabled',false);
      insertLine("\n");
      insertLine(
        "███░░░░██░░█████░░███████░██░░░░███████░██░░░██░\n" +
        "████░░░██░██░░░██░░░░███░░██░░░░██░░░░░░██░░░██░\n" +
        "██░██░░██░███████░░░███░░░██░░░░███████░███████░\n" +
        "██░░██░██░██░░░██░░███░░░░██░░░░░░░░░██░██░░░██░\n" +
        "██░░░████░██░░░██░███████░██░██░███████░██░░░██░\n" );
      insertLine("\n");
      insertLine("To see the list of commands type '<strong>help</strong>' or type '<strong>cv</strong>' to see all the information",true);
      $('#input').focus();
      return;
    }
    insertedLine.innerText += ".";
    counter+=1
  }
  interval = setInterval(loadingMessage,350);

}

function readCommand(event){
  if (event.key != "Enter") {
    return;
  }
  const command = event.target.value.trim().toLowerCase();
  event.target.value='';

  if(command === ""){
    return;
  }

  if(command == "help"){
    helpCommand();
    return;
  }

  if(command == "cv"){
    cvCommand();
    return;
  }

  if(command == "github"){
    window.open('https://github.com/N44zxyy','_blank');
    return;
  }

  if(command == "linkedin"){
    window.open('https://www.linkedin.com/in/nazim-mohd','_blank');
    return;
  }

  if(command == "python"){
    window.open('https://www.udemy.com/certificate/UC-e45452e0-e5bb-402e-9ef5-8d00ea4b2c3a/','_blank');
    return;
  }

  if(command == "resume"){
    window.open('./assets/nazim-resume.pdf','_blank');
    return;
  }

  if(command == "cls"){
    clearCommand();
    return;
  }

  let element = commands[command];

  if(element){
    printContent(element,"$ ");
    return;
  }

  insertLine(`Command '${command}' is not recognized as an internal command.`);
}


function helpCommand(){
  insertLine("\nList all command information");
  insertLine("\n");
  insertLine("<strong>cv</strong>: Show all CV information",true);
  let commandKeys = Object.keys(commands);
  for(let i = 0; i < commandKeys.length; i++){
    let command = commands[commandKeys[i]];
    insertLine(`<strong>${commandKeys[i]}</strong>: ${command.description}`,true);
  }
  insertLine("\n");
  insertLine("<strong>cls</strong>: Clear the console",true);
}

function cvCommand(){
  insertLine("\n");
  insertLine("\n$ <strong>--Information--</strong>\n",true);
  printContent(commands['about']);
  insertLine("\n<strong>$ --Education--</strong>\n",true);
  printContent(commands['education']);
  insertLine("\n<strong>$ --Project--</strong>\n",true);
  printContent(commands['project']);
  insertLine("\n<strong>$ --certificate--</strong>\n",true);
  printContent(commands['certificate']);
  insertLine("\n<strong>$ --LinkedIn--</strong>\n",true);
  printContent(commands['linkedin']);
  insertLine("\n<strong>$ --GitHub--</strong>\n",true);
  printContent(commands['github']);
}

function clearCommand(){
  let element = document.getElementById("screen");
  element.innerHTML = "";
  updateScroll();
}

function printContent(command,prefix=""){
  if(command.multiline){
    if(prefix != ''){
      insertLine(prefix)
    }
    for(let x = 0; x< command.content.length; x++){
      insertLine(`${command.content[x]}`)
    }
    return;
  }
  insertLine(`${prefix}${command.content}`)

}
