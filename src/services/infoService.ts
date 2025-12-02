import { InfoValue } from '../interfaces';
import { baseUrl } from './utils/constants';

function validateInfoFromServer(infoValue: InfoValue): Promise<Response> {
  return fetch(`${baseUrl}/info/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...infoValue,
      dateOfBirth: new Date(infoValue.dateOfBirth)
    })
  });
}

const infoService = { validateInfoFromServer };
export default infoService;