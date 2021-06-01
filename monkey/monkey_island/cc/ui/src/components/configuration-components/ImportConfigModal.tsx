import {Button, Modal, Form} from 'react-bootstrap';
import React, {useState} from 'react';

import AuthComponent from '../AuthComponent';
import '../../styles/components/configuration-components/ExportConfigModal.scss';


type Props = {
  show: boolean,
  onClick: () => void
}

const ConfigImportModal = (props: Props) => {
  // TODO implement the back end
  const configExportEndpoint = '/api/configuration/export';

  const [pass, setPass] = useState('');
  const [radioValue, setRadioValue] = useState('password');
  const authComponent = new AuthComponent({});

  function isExportBtnDisabled() {
    return pass === '' && radioValue === 'password';
  }

  function onSubmit() {
    authComponent.authFetch(configExportEndpoint,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          should_encrypt: (radioValue === 'password'),
          password: pass
        })
      }
    )
  }

  return (
    <Modal show={props.show}
           onHide={props.onClick}
           size={'lg'}
           className={'config-export-modal'}>
      <Modal.Header closeButton>
        <Modal.Title>Configuration import</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div key={'config-export-option'}
             className={`mb-3 export-type-radio-buttons`}>
          <Form>
            <Form.File id="exampleFormControlFile1"
                       label="Example file input" />
          </Form>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'info'}
                onClick={onSubmit}
                disabled={isExportBtnDisabled()}>
          Import
        </Button>
      </Modal.Footer>
    </Modal>)
}

const PasswordInput = (props: {
  onChange: (passValue) => void
}) => {
  return (
    <div className={'config-export-password-input'}>
      <p>Encrypt with a password:</p>
      <Form.Control type='password'
                    placeholder='Password'
                    onChange={evt => (props.onChange(evt.target.value))}/>
    </div>
  )
}

const ExportPlaintextChoiceField = (props: {
  radioValue: string,
  onChange: (radioValue) => void
}) => {
  return (
    <div className={'config-export-plaintext'}>
      <Form.Check
        type={'radio'}
        label={'Skip encryption (export as plaintext)'}
        name={'export-choice'}
        value={'plaintext'}
        checked={props.radioValue === 'plaintext'}
        onChange={evt => {
          props.onChange(evt.target.value);
        }}
      />
      <p className={`export-warning text-secondary`}>
        Configuration might contain stolen credentials or sensitive data.<br/>
        It is advised to use password encryption option.
      </p>
    </div>
  )
}


export default ConfigImportModal;
