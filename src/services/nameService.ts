import { baseUrl } from './utils/constants';

function validateNameFromServer(name: string): Promise<Response> {
  return fetch(`${baseUrl}/name/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
    })
  });
}

const nameService = { validateNameFromServer };
export default nameService;