function cadastro() {
    var senha = document.getElementById("senha");
    var senha1 = document.getElementById("senha1");

    if (senha.value != senha1.value) {
        alert("As senhas estão diferentes! Confirme a senha novamente");
        senha1.focus();
        return false;

    } else {
        localStorage.setItem("email", document.getElementById("email").value);
        var senhacrip = '';

        for(i=0; i<senha1.value.length; i++) {
            if (senha1.value.charCodeAt(i)>=100) {
                var senha2 = senha1.value.charCodeAt(i)-100; 

                if (senha2 <= 9) {
                    senhacrip = senhacrip + 'A' + senha2.toString();
                } else {
                    switch(senha2.toString().substring(0, 1)) {
                        case "1": senhacrip = senhacrip + 'B' + senha2.toString().substring(1, 2);
                        break;
                        case "2": senhacrip = senhacrip + 'C' + senha2.toString().substring(1, 2);
                        break;
                        default: alert("erro");
                    }
                }
            } else {
                senhacrip = senhacrip + senha1.value.charCodeAt(i).toString();
            }
        }

        localStorage.setItem("senha", senhacrip);

        alert("Cadastro realizado com sucesso");
        window.open('./html/entrar.html');

        return true;
    }
}

function entrar() {
    var emailsalvo = localStorage.getItem("email");
    var senhasalva = localStorage.getItem("senha");

    var emaildigitado = document.getElementById("email");
    var senhadigitada = document.getElementById("senha");
    
    var senhadescrip = '';

    for(i=0; i<(senhasalva.length)-1; i=i+2) {
        if (isNaN(Number(senhasalva.substring(i, i+2)))) {
            switch(senhasalva.substring(i, i+2).substring(0, 1)) {
                case "A": var senha3  = senhasalva.substring(i, i+2).substring(1, 2);
                senha3 = Number.parseInt(senha3) + 100;
                senhadescrip = senhadescrip + String.fromCharCode(senha3.toString());
                break;
                case "B": var senha3  = '1' + senhasalva.substring(i, i+2).substring(1, 2);
                senha3 = Number.parseInt(senha3) + 100;
                senhadescrip = senhadescrip + String.fromCharCode(senha3.toString());
                break;
                case "C": var senha3  = '2' + senhasalva.substring(i, i+2).substring(1, 2);
                senha3 = Number.parseInt(senha3) + 100;
                senhadescrip = senhadescrip + String.fromCharCode(senha3.toString());
                break;
                default: alert("erro");
            }
        } else {
            senhadescrip = senhadescrip + String.fromCharCode(senhasalva.substring(i, i+2));
        }
    }

    if (emailsalvo == emaildigitado.value && senhadescrip == senhadigitada.value) {
        localStorage.setItem("2reais", "0");
        localStorage.setItem("5reais", "0");
        localStorage.setItem("10reais", "0");
        localStorage.setItem("20reais", "0");
        localStorage.setItem("50reais", "0");
        localStorage.setItem("100reais", "0");
        localStorage.setItem("saldo", "0");

        alert("Login realizado com sucesso");
        window.open('../html/servicos.html');

        return true;
    } else {
        alert("E-mail ou senha incorretos.");
        return false;
    }
}

function linkdep() {
    window.open('../html/deposito.html');
}


function linksaq() {
    var saldo = localStorage.getItem("saldo");
    if (saldo==null || saldo==0) {
        alert("Não há saldo para efetuar um saque. Deposite primeiro.");
        window.open('../html/deposito.html');
    } else {
        window.open('../html/saque.html');
    }
}


function depositar() {
    var doisreais = Number.parseInt(document.getElementById("2reais").value);
    var cincoreais = Number.parseInt(document.getElementById("5reais").value);
    var dezreais = Number.parseInt(document.getElementById("10reais").value);
    var vintereais = Number.parseInt(document.getElementById("20reais").value);
    var cinquentareais = Number.parseInt(document.getElementById("50reais").value);
    var cemreais = Number.parseInt(document.getElementById("100reais").value);

    var saldo = doisreais*2 + cincoreais*5 + dezreais*10 + vintereais*20 + cinquentareais*50 + cemreais*100;

    localStorage.setItem("2reais", Number.parseInt(localStorage.getItem("2reais")) + doisreais);
    localStorage.setItem("5reais", Number.parseInt(localStorage.getItem("5reais")) + cincoreais);
    localStorage.setItem("10reais", Number.parseInt(localStorage.getItem("10reais")) + dezreais);
    localStorage.setItem("20reais", Number.parseInt(localStorage.getItem("20reais")) + vintereais);
    localStorage.setItem("50reais", Number.parseInt(localStorage.getItem("50reais")) + cinquentareais);
    localStorage.setItem("100reais", Number.parseInt(localStorage.getItem("100reais")) + cemreais);

    localStorage.setItem("saldo", Number.parseInt(localStorage.getItem("saldo")) + saldo);

    alert("Depósito realizado com sucesso");
    window.open('../html/saque.html');

    return true;
}

function sacar(e) {
    e.preventDefault();

    var saldo = Number.parseInt(localStorage.getItem("saldo"));
    var saque = Number.parseInt(document.getElementById("saque").value);

    if (saldo<saque) {
        alert("Não há saldo o suficiente para efetuar o saque. Deposite primeiro. Saldo atual = RS"+saldo+",00");
        window.open('../html/deposito.html');
        return false;
    } else {
        var notas1 = [100, 50, 20, 10, 5, 2];

        for (var nota of notas1) {
            var numnotas = nota.toString()+"reais";

            if (Number.parseInt(saque/nota)>localStorage.getItem(numnotas)) {
                var qtdNotas = localStorage.getItem(numnotas);
                var notasresto = Number.parseInt(localStorage.getItem(numnotas))-localStorage.getItem(numnotas);
                
                saque = saque-localStorage.getItem(numnotas)*nota;
            } else {
                var qtdNotas = Number.parseInt(saque/nota);
                var notasresto = Number.parseInt(localStorage.getItem(numnotas))-Number.parseInt(saque/nota);

                saque=saque%nota;
            }
            
            localStorage.setItem(numnotas, notasresto);

            switch(nota) {
                case 2: document.getElementById("2-1").value = qtdNotas;
                break;
                case 5: document.getElementById("5-1").value = qtdNotas;
                break;
                case 10: document.getElementById("10-1").value = qtdNotas;
                break;
                case 20: document.getElementById("20-1").value = qtdNotas;
                break;
                case 50: document.getElementById("50-1").value = qtdNotas;
                break;
                case 100: document.getElementById("100-1").value = qtdNotas;
                break;
                default: alert("erro");
            }
        }

        if(saque>0) {
            document.getElementsByClassName("resto")[0].innerHTML="Sobrou R$"+saque+",00, o valor será devolvido para a sua conta";
        }

        localStorage.setItem("saldo", Number.parseInt(localStorage.getItem("saldo")) - Number.parseInt(document.getElementById("saque").value) + saque);

        document.getElementById("saque").disabled='true';
        document.getElementsByTagName('input')[7].style.display='none';
        document.getElementById("centro2").style.display='grid';

        alert("Saque realizado com sucesso");

        return true;
    }
}