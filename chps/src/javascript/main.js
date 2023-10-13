
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

export const numberGenerator = () => {
    const numeroAleatorio = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    return numeroAleatorio + Date.now();
};

export const telFormater = (tel) => {
    const numberClean = tel.replace(/\s/g, "");
    const regex = /^(\d{2})(\d{5})(\d{4})$/;
    const match = numberClean.match(regex);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    } else {
        return numberClean;
    }
};