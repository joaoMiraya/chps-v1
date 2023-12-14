
/* PEGAR A DATA  ATUAL */
export const getDate = () => {
    const date = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleString('pt-BR', options);
};
/* PEGAR A HORA  ATUAL */
export const getHours = () => {
    const date = new Date();
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('pt-BR', options);
};
/* GERA NUMERO ALEATORIO */
export const numberGenerator = () => {
    const numeroAleatorio = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    return numeroAleatorio + Date.now();
};
/* FORMATA O PADRÃO DO CELULAR */
export const telFormater = (tel) => {
    const numberClean = tel.toString().replace(/\D/g, "");
    const phone = `(${numberClean.slice(0, 2)}) ${numberClean.slice(2, 7)}-${numberClean.slice(7)}`;
    return phone;
};
/* FORMATA A STRING PARA FORMATO DE CAPITAL */
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
/* FORMATA A STRING PARA NUMBER FLOAT */
export const converterStringToFloat = (str) => {
    if (typeof str == 'number') {
        return str
    } else {
        if (str.includes(',')) {
            let formatted = str.replace(',', '.');
            return Number(formatted);
        } else {
            return Number(str);
        }
    }
};