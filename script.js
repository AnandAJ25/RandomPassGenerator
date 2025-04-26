document.addEventListener("DOMContentLoaded", () => {
    const resultel = document.getElementById("result");
    const lengthel = document.getElementById("length");
    const uppercaseel = document.getElementById("uppercase");
    const lowercaseel = document.getElementById("lowercase");
    const numberel = document.getElementById("number");
    const symbolsel = document.getElementById("symbols");
    const generateel = document.getElementById("generate");
    const clipboardel = document.getElementById("clipboard");

    if (!resultel || !lengthel || !uppercaseel || !lowercaseel || !numberel || !symbolsel || !generateel) {
        console.error("One or more required elements are missing in the HTML.");
        return;
    }

    const randomfuncs = {
        lowerfn: getrandomlowercase,
        upperfn: getrandomuppercase,
        numberfn: getrandomnumber,
        symbolfn: getrandomsymbol,
    };

    generateel.addEventListener("click", () => {
        const length = +lengthel.value || 0; // + converts string to number
        const haslower = lowercaseel.checked || false; // true or false
        const hasupper = uppercaseel.checked || false; // true or false
        const hasnumber = numberel.checked || false; // true or false
        const hassymbol = symbolsel.checked || false; // true or false

        if (resultel) {
            resultel.innerText = generatePassword(haslower, hasupper, hasnumber, hassymbol, length);
        }
    });

    clipboardel.addEventListener("click", () => {
        const password = resultel.innerText;
        if (!password) {
            alert("No password to copy!");
            return;
        }
        navigator.clipboard.writeText(password).then(() => {
            alert("Password copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy password: ", err);
        });
    });

    function generatePassword(lower, upper, number, symbol, length) {
        let password = "";
        const typecount = lower + upper + number + symbol;
        console.log(typecount);

        if (typecount === 0) {
            return "Please select at least one option.";
        }

        const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
            (item) => Object.values(item)[0]
        );

        for (let i = 0; i < length; i += typecount) {
            typesArr.forEach((type) => {
                const funcName = Object.keys(type)[0] + "fn";
                password += randomfuncs[funcName]();
            });
        }

        return password.slice(0, length);
    }

    //  lowercase letter  between  97-122 char-code in ascii table
    function getrandomlowercase(){
       return String.fromCharCode(Math.floor(Math.random()*26) +97) ;
    }
     //  uppercase letter  between  65-90 char-code in ascii table
    function getrandomuppercase(){
        return String.fromCharCode(Math.floor(Math.random()*26) +65) ;
      }
        // for num generation between  48-57 char-code in ascii table
    function getrandomnumber(){
         return String.fromCharCode(Math.floor(Math.random()*10) +48)
    }

    function getrandomsymbol(){
        const symbols = "!@#$%^&*(){}[]=<>/,.|~?;:[]";
       return symbols[Math.floor(Math.random() * symbols.length)]; 
    }
});


