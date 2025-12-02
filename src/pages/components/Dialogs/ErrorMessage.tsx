import { MessageProps } from '../../../interfaces'
import './dialog.css'
import { DialogClassNames } from './enums';

export function ErrorMessage({ onClick }: MessageProps) {
  return (
    <div className={DialogClassNames.DIALOG_OVERLAY}>
      <div className={DialogClassNames.DIALOG_CARD}>
        <h2 style={{ color: '#d9534f' }}>ERRORE INVIO DATI</h2>
        <p>Si è verificato un errore durante l'invio dei dati. Riprova.</p>
      <button className={DialogClassNames.DIALOG_BUTTON} onClick={onClick}>RIPROVA</button>
    </div>
    </div>
  );
}