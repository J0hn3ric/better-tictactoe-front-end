import { MessageProps } from '../../../interfaces'
import './dialog.css'
import { DialogClassNames } from './enums';

export function SendingMessage({ onClick }: MessageProps) {
  return(
    <div className={DialogClassNames.DIALOG_OVERLAY}>
      <div className={DialogClassNames.DIALOG_CARD}>
        <h2>INVIO IN CORSO</h2>
      <button className={DialogClassNames.DIALOG_BUTTON} onClick={onClick}>ANNULLA</button>
    </div>
    </div>
  );
}