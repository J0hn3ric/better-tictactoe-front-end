import { useEffect, useReducer, useState } from 'react';
import { BaseResponse } from '../interfaces';
import { RequestActionKind, RequestState } from './utils/enums';
import { SendingMessage } from './components/Dialogs/SendingMessage';
import { ErrorMessage } from './components/Dialogs/ErrorMessage';
import { SentMessage } from './components/Dialogs/SentMessage';
import nameService from '../services/nameService';
import { requestStateReducer } from './reducers/requestStateReducer';

export function CheckName() {
  const [status, dispatchStatus] = useReducer(requestStateReducer, RequestState.INITIAL);
  const [value, setValue] = useState<string>('');
  const [data, setData] = useState<BaseResponse>();

  function reset() { 
    setValue('');
    dispatchStatus({ type: RequestActionKind.RESET }); 
  }

  useEffect(() => {
    if(status === RequestState.SEND_DATA) {
      dispatchStatus({ type: RequestActionKind.SENDING });
      nameService.validateNameFromServer(value)
      .then((rawResponse) => {
        if(rawResponse.ok) {
          return rawResponse.json();
        } else {
          throw new Error();
        }        
      })
      .then((response: BaseResponse) => {
        dispatchStatus({ type: RequestActionKind.SEND_SUCCESS });
        setData(response);
      })
      .catch(e => {
        dispatchStatus({ type: RequestActionKind.SEND_ERROR });
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div>
      { status === RequestState.ERROR_SENDING_DATA && <ErrorMessage onClick={reset} /> }

      { 
        (status === RequestState.SEND_DATA || status === RequestState.SENDING_DATA) &&
        <SendingMessage onClick={reset} />
      }

      { status === RequestState.DATA_SENDED && <SentMessage onClick={reset} data={data} /> }


      <h1>INSERISCI IL NOME</h1>
      <input type="text" value={value} onChange={(e) => {
        setValue(e.target.value);
      }}></input>
      <button onClick={() => {
        dispatchStatus({ type: RequestActionKind.START_SEND });
      }}>VALIDA</button>
    </div>
  );
}
