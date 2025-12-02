import React, { useEffect, useReducer, useState } from 'react';
import { InfoActionKind, RequestActionKind, RequestState } from './utils/enums';
import { BaseResponse, InfoValue } from '../interfaces';
import { ErrorMessage } from './components/Dialogs/ErrorMessage';
import { SendingMessage } from './components/Dialogs/SendingMessage';
import { SentMessage } from './components/Dialogs/SentMessage';
import { InfoForm } from './components/InfoForm/InfoForm';
import infoService from '../services/infoService';
import { requestStateReducer } from './reducers/requestStateReducer';

const initialInfoValue: InfoValue = {
  name: '',
  age: 0,
  married: null,
  dateOfBirth: ''
};

type InfoAction =
  | { type: "UPDATE", name: keyof InfoValue, payload: string | number | boolean | null }
  | { type: "RESET" };

function infoReducer(state: InfoValue, action: InfoAction) {
  switch(action.type) {
    case InfoActionKind.UPDATE:
      return {
        ...state,
        [action.name]: action.payload
      };

    case InfoActionKind.RESET:
      return initialInfoValue;

    default:
      return state;
  }
}

export function CheckInfo() {
  const [status, dispatchStatus] = useReducer(requestStateReducer, RequestState.INITIAL);
  const [infoState, dispatchInfo] = useReducer(infoReducer, initialInfoValue);
  const [data, setData] = useState<BaseResponse>();

  function reset() { 
    dispatchInfo({ type: InfoActionKind.RESET });
    dispatchStatus({ type: RequestActionKind.RESET }); 
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatchStatus({ type: RequestActionKind.START_SEND });
  }

  useEffect(() => {
    if (status === RequestState.SEND_DATA) {
      dispatchStatus({ type: RequestActionKind.SENDING });
      infoService.validateInfoFromServer(infoState)
      .then((rawResponse) => {
        if (rawResponse.ok) {
          return rawResponse.json();
        } else {
          throw new Error();
        }
      })
      .then((response: BaseResponse) => {
        dispatchStatus({ type: RequestActionKind.SEND_SUCCESS });
        setData(response);
      })
      .catch(_ => {
        dispatchStatus({ type: RequestActionKind.SEND_ERROR });
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div>
      { status === RequestState.ERROR_SENDING_DATA && <ErrorMessage onClick={reset} />}

      { 
        (status === RequestState.SEND_DATA || status === RequestState.SENDING_DATA) &&
        <SendingMessage onClick={reset} />
      }

      { status === RequestState.DATA_SENDED && <SentMessage onClick={reset} data={data} /> }

      <InfoForm
        infoValue={infoState}
        ageMin={0}
        ageMax={150}
        onSubmit={onSubmit}
        onChangeName={(e) => 
          dispatchInfo({ 
            type: InfoActionKind.UPDATE,
            name: 'name',
            payload: e.target.value
          })
        }
        onChangeAge={(e) =>
          dispatchInfo({ 
            type: InfoActionKind.UPDATE,
            name: 'age',
            payload: Number(e.target.value)
          })
        }
        onChangeMarried={(e) => 
          dispatchInfo({ 
            type: InfoActionKind.UPDATE,
            name: 'married',
            payload: e.target.value === ''
              ? null
              : e.target.value === 'true'
          })
        }
        onChangeDateOfBirth={(e) => 
          dispatchInfo({ 
            type: InfoActionKind.UPDATE,
            name: 'dateOfBirth',
            payload: e.target.value 
          })
        }
      />
    </div>
  );
}