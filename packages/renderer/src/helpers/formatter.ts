/* eslint-disable @typescript-eslint/no-explicit-any */
export const dateDecode = (dateString: string) => {
  const dateObject = new Date(dateString);
  if (dateObject.toString() === 'Invalid Date') return dateString;
  return dateObject.toLocaleDateString('pt-BR').split('/').join('/');
};

export const dateTimeDecode = (dateString: string) => {
  if (!dateString) return dateString;
  const dateObject = new Date(dateString);
  if (dateObject.toString() === 'Invalid Date') return dateString;
  return dateObject.toLocaleString('pt-BR').split(',').join('');
};

export const statusDecode = (statusString: string) => {
  let statusFormat;
  switch (statusString) {
    case 'Open':
      statusFormat = 'Aberto';
      break;
    case 'Close':
      statusFormat = 'Fechado';
      break;
    case 'Suspended':
      statusFormat = 'Suspenso';
      break;
    case 'Finished':
      statusFormat = 'Finalizado';
      break;
  }
  return statusFormat;
};

export const currencyEncode = (currency: any) => {
  const number = parseFloat(currency);

  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const integerEncode = (integer: string) => {
  return parseFloat(integer).toFixed(0);
};

export const formatListByHeader = (
  header: {title: string; key: string; align: string; format: string}[],
  list: any,
) => {
  const dataTableHeaders = header;

  return list.map((item: any) => {
    let field_name: string = '0';
    let field_count: number = 0;

    for (field_name in item) {
      if (dataTableHeaders[field_count]) {
        switch (dataTableHeaders[field_count]['format']) {
          case 'date':
            item[field_name] = dateDecode(item[field_name]);
            break;
          case 'currency':
            item[field_name] = currencyEncode(item[field_name]);
            break;
          case 'integer':
            item[field_name] = currencyEncode(item[field_name]);
            break;
          case 'status':
            item[field_name] = statusDecode(item[field_name]);
            break;
          case 'datetime':
            item[field_name] = dateTimeDecode(item[field_name]);
        }
      }
      field_count++;
    }

    return {
      ...item,
    };
  });
};

export const msToTime = (duration: number) => {
  let minutes: string | number = Math.floor((duration / (1000 * 60)) % 60);
  let hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return hours + ':' + minutes;
};

export const formatCardNumber = (card_id: string) => {
  const regex = /[A-Za-z0-9]+/g;
  const numbersArray = card_id.match(regex);
  const numbersString = numbersArray ? numbersArray.join('') : '';
  return numbersString.trim();
};

export const resolveStatusPromotionVariant = (status: string) => {
  const return_status = {
    color: '',
    text: '',
  };
  switch (status) {
    case 'Fixed':
      return_status.color = 'success';
      return_status.text = 'Fixo';
      break;
    case 'Variable':
      return_status.color = 'warning';
      return_status.text = 'Variável';
      break;
    default:
      return_status.color = 'info';
      return_status.text = status;
      break;
  }

  return return_status;
};
