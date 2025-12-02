import { BaseResponse, MessageProps } from '../../../interfaces'
import { DialogClassNames } from './enums';
import './dialog.css'

interface SentMessageProps extends MessageProps {
  data: BaseResponse | undefined
}

export function SentMessage({ onClick, data }: SentMessageProps) {
  return (
    <div className={DialogClassNames.DIALOG_OVERLAY}>
      <div className={DialogClassNames.DIALOG_CARD}>
        <h2 style={{ color: data?.success ? '#28a745' : '#d9534f' }}>
          { data?.success ? 'DATI INVIATI VALIDI' : 'DATI INVIATI NON VALIDI' }
        </h2>

        {data?.success === false && data.errors && (
          <ul style={{ textAlign: 'left', paddingLeft: '16px', marginTop: '12px' }}>
            {data.errors.map((err, index) =>
              err.constraints && Object.values(err.constraints).map((msg, i) => (
                <li key={`${index}-${i}`}>
                  {err.property}: {msg}
                </li>
              ))
            )}
          </ul>
        )}

        <button className={DialogClassNames.DIALOG_BUTTON} onClick={onClick}>INVIA UN ALTRO VALORE</button>
      </div>
    </div>
  );
}