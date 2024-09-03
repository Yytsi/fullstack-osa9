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
} from '@mui/material';

import { SelectChangeEvent } from '@mui/material';

import { HealthCheckRating, EntryPossibleValues } from '../../types';

const AddEntryForm = ({
  onSubmit,
  onCancel,
  setErrorMessageWithDelay,
}: {
  onSubmit: (entry: EntryPossibleValues) => void;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  setErrorMessageWithDelay: (message: string, time: number) => void;
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
  const [diagnosisTextField, setDiagnosisTextField] = useState<string>('');

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let parsedDiagnosisCodes: string[] = [];

    try {
      parsedDiagnosisCodes = diagnosisTextField
        .split(',')
        .map((code) => code.trim())
        .filter((code) => code.length > 0);
    } catch (e) {
      console.error(e);
      setErrorMessageWithDelay(
        'Invalid diagnosis codes, use comma separated values',
        7000
      );
    }

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
      diagnosisCodes: parsedDiagnosisCodes,
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

        <CardContent
          sx={{
            '& > * > *': {},
          }}
        >
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
              <TextField
                label="Date"
                type="text"
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
                  <TextField
                    label="Sick Leave Start Date"
                    type="text"
                    value={sickLeaveStartDate}
                    onChange={({ target }) =>
                      setSickLeaveStartDate(target.value)
                    }
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Sick Leave End Date"
                    type="text"
                    value={sickLeaveEndDate}
                    onChange={({ target }) => setSickLeaveEndDate(target.value)}
                  />
                </FormControl>
              </>
            )}

            {type === 'Hospital' && (
              <>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Discharge Date"
                    type="text"
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
                <TextField
                  label="Diagnosis codes"
                  type="text"
                  value={diagnosisTextField}
                  onChange={({ target }) => setDiagnosisTextField(target.value)}
                />
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
