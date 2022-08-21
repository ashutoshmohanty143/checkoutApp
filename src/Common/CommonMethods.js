class CommonMethods {
    
    // Only Number Allowed Validation
    numberValidation(e){
        let el = e.target,
            newValue = el.value
            ;
        newValue = newValue.replace(new RegExp(/[^\d]/, 'g'), '');
        el.value = newValue;
        return el.value;
    }   


    // Phone Masking    
    mask = (value) => {
        let output = [];
          for(let i = 0; i < value.length; i++) {
    
              if(i === 3){
                output.push(" ");
              }
              if(i === 6){
                output.push(" ");
              }
                output.push(value[i]);
            }
          return output.join("");
      };
    unmask = (value) => {
    let output = value.replace(new RegExp(/[^\d]/, 'g'), '');
    return output;
    };  
    phoneMasking(e) {
        let oldValue;
        let el = e.target,
            newValue = el.value
            ;
        newValue = this.unmask(newValue);
        let regex = new RegExp(/^\d{0,10}$/g);
        if (newValue.match(regex)) {
            newValue = this.mask(newValue);
            el.value = newValue;
        } else {
            el.value = oldValue;
        }
        return el.value;
    }


    // Email Validating
    emailValidator(emailInputHandler){
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regex.test(emailInputHandler);
    }

    // Password Validating
    passwordValidator(passwordInput) {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})");
        return strongRegex.test(passwordInput);
    }


    
}

export default new CommonMethods();