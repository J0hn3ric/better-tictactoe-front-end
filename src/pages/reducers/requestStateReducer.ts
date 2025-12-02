import { RequestActionKind, RequestState } from '../utils/enums';

type RequestAction =
  | { type: RequestActionKind.START_SEND }
  | { type: RequestActionKind.SENDING }
  | { type: RequestActionKind.SEND_ERROR }
  | { type: RequestActionKind.SEND_SUCCESS }
  | { type: RequestActionKind.RESET };

export function requestStateReducer(state: RequestState, action: RequestAction) {
  switch (action.type) {
    case RequestActionKind.START_SEND:
      return RequestState.SEND_DATA;

    case RequestActionKind.SENDING:
      return RequestState.SENDING_DATA;

    case RequestActionKind.SEND_ERROR:
      return RequestState.ERROR_SENDING_DATA;

    case RequestActionKind.SEND_SUCCESS:
      return RequestState.DATA_SENDED;

    case RequestActionKind.RESET:
      return RequestState.INITIAL;

    default:
      return state;
  }
}