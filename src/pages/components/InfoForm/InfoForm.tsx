import React from 'react';
import './info-form.css'
import { InfoValue } from '../../../interfaces';

interface InfoFormProps {
  infoValue: InfoValue,
  ageMin: number,
  ageMax: number,
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeAge: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeMarried: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  onChangeDateOfBirth: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

enum InfoClassNames {
  INFO_CARD = 'info-card',
  INFO_TITLE = 'info-title',
  INFO_FORM = 'info-form',
  INFO_FIELD = 'info-field',
  INFO_LABEL = 'info-label',
  INFO_INPUT = 'info-input',
  INFO_SELECT = 'info-select',
  INFO_BUTTON = 'info-button',
}

export function InfoForm (props: InfoFormProps) {
  return(
    <div className={InfoClassNames.INFO_CARD}>
      <h2 className={InfoClassNames.INFO_TITLE}>Inserisci le tue informazioni</h2>

      <form onSubmit={props.onSubmit} className={InfoClassNames.INFO_FORM}>

        <div className={InfoClassNames.INFO_FIELD}>
          <label className={InfoClassNames.INFO_LABEL}>Name</label>
          <input 
            type='text'
            className={InfoClassNames.INFO_INPUT}
            value={props.infoValue.name}
            onChange={props.onChangeName}
          />
        </div>

        <div className={InfoClassNames.INFO_FIELD}>
          <label className={InfoClassNames.INFO_LABEL}>Age</label>
          <input 
            type='number'
            className={InfoClassNames.INFO_INPUT}
            min={props.ageMin}
            max={props.ageMax}
            value={props.infoValue.age === 0 ? '' : props.infoValue.age}
            onChange={props.onChangeAge}
          />
        </div>

        <div className={InfoClassNames.INFO_FIELD}>
          <label className={InfoClassNames.INFO_LABEL}>Married</label>
          <select
            className={InfoClassNames.INFO_SELECT}
            value={
              props.infoValue.married === null 
              ? '' 
              : props.infoValue.married ? 'true' : 'false'
            }
            onChange={props.onChangeMarried}
          >
            <option value=''>-- Select --</option>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </div>

        <div className={InfoClassNames.INFO_FIELD}>
          <label className={InfoClassNames.INFO_LABEL}>Date of Birth</label>
          <input 
            type='text'
            className={InfoClassNames.INFO_INPUT}
            placeholder='YYYY-MM-DD'
            value={props.infoValue.dateOfBirth}
            onChange={props.onChangeDateOfBirth}
          />
        </div>

        <button type='submit' className={InfoClassNames.INFO_BUTTON}>
          Validate
        </button>
      </form>
    </div>
  );
}