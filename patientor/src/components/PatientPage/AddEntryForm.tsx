import { useState } from 'react';

import {
  Card,
  CardContent,
  Button,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Input,
  OutlinedInput,
} from '@mui/material';

import { SelectChangeEvent } from '@mui/material';

import { HealthCheckRating, EntryPossibleValues } from '../../types';

// this is taken from backend data
const diagnosisCodeList = [
  'M24.2',
  'M51.2',
  'S03.5',
  'J10.1',
  'J06.9',
  'Z57.1',
  'N30.0',
  'H54.7',
  'J03.0',
  'L60.1',
  'Z74.3',
  'L20',
  'F43.2',
  'S62.5',
  'H35.29',
];

const AddEntryForm = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: (entry: EntryPossibleValues) => void;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const [type, setType] = useState('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(
    HealthCheckRating.Healthy
  );
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [diagnosisCodesInputList, setDiagnosisCodesInputList] = useState<
    string[]
  >([]);

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const entry: EntryPossibleValues = {
      type,
      description,
      date,
      specialist,
      healthCheckRating,
      employerName,
      sickLeave: {
        startDate: sickLeaveStartDate,
        endDate: sickLeaveEndDate,
      },
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
      diagnosisCodes: diagnosisCodesInputList,
    };

    onSubmit(entry);
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            minWidth: 120,
            display: 'flex',
          }}
        >
          <FormControl sx={{ width: '40%' }}>
            <InputLabel id="entry-type-select-label">Entry</InputLabel>
            <Select
              labelId="entry-type-select-label"
              value={type}
              label="Entry"
              onChange={handleTypeChange}
            >
              <MenuItem value={'HealthCheck'}>Health check</MenuItem>
              <MenuItem value={'Hospital'}>Hospital</MenuItem>
              <MenuItem value={'OccupationalHealthcare'}>
                Occupational healthcare
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <TextField
                id="description"
                label="Description"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <p>Admission date</p>
              <Input
                type="date"
                value={date}
                onChange={({ target }) => setDate(target.value)}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Specialist"
                type="text"
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
              />
            </FormControl>

            {type === 'HealthCheck' && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="health-check-rating-label">Rating</InputLabel>
                <Select
                  labelId="health-check-rating-label"
                  value={healthCheckRating}
                  label="Rating"
                  onChange={({ target }) =>
                    setHealthCheckRating(Number(target.value))
                  }
                >
                  <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
                  <MenuItem value={HealthCheckRating.LowRisk}>
                    Low risk
                  </MenuItem>
                  <MenuItem value={HealthCheckRating.HighRisk}>
                    High risk
                  </MenuItem>
                  <MenuItem value={HealthCheckRating.CriticalRisk}>
                    Critical risk
                  </MenuItem>
                </Select>
              </FormControl>
            )}

            {type === 'OccupationalHealthcare' && (
              <>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Employer Name"
                    type="text"
                    value={employerName}
                    onChange={({ target }) => setEmployerName(target.value)}
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <p>Sick leave start date</p>
                  <Input
                    type="date"
                    value={sickLeaveStartDate}
                    onChange={({ target }) => {
                      setSickLeaveStartDate(target.value);
                      console.log(target.value);
                    }}
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <p>Sick leave end date</p>
                  <Input
                    id="sickLeaveEndDate"
                    type="date"
                    value={sickLeaveEndDate || ''}
                    onChange={({ target }) => setSickLeaveEndDate(target.value)}
                  />
                </FormControl>
              </>
            )}

            {type === 'Hospital' && (
              <>
                <FormControl fullWidth margin="normal">
                  <p>Discharge date</p>
                  <Input
                    type="date"
                    value={dischargeDate}
                    onChange={({ target }) => setDischargeDate(target.value)}
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Discharge Criteria"
                    type="text"
                    value={dischargeCriteria}
                    onChange={({ target }) =>
                      setDischargeCriteria(target.value)
                    }
                  />
                </FormControl>
              </>
            )}

            <>
              <FormControl fullWidth margin="normal">
                <InputLabel id="diagnosis-codes-label">
                  Diagnosis codes
                </InputLabel>
                <Select
                  labelId="diagnosis-codes-label"
                  multiple
                  value={diagnosisCodesInputList}
                  onChange={({ target }) =>
                    setDiagnosisCodesInputList(target.value as string[])
                  }
                  input={<OutlinedInput label="Diagnosis codes" />}
                >
                  {diagnosisCodeList.map((code) => (
                    <MenuItem key={code} value={code}>
                      {code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                onClick={onCancel}
                sx={{
                  backgroundColor: 'white',
                  color: 'red',
                  border: '1px solid red',
                  borderRadius: '5px',
                  marginRight: '8px',
                  marginTop: '1rem',
                  marginBottom: '2px',
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                sx={{
                  backgroundColor: 'white',
                  color: 'blue',
                  border: '1px solid blue',
                  borderRadius: '5px',
                  marginTop: '1rem',
                }}
              >
                Add
              </Button>
            </Box>
          </form>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default AddEntryForm;
