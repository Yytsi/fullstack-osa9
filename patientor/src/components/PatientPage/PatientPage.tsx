import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import patientService from '../../services/patients';
import { useDiagnoses } from '../contexts/DiagnosisContext';

import { Patient, Entry, Diagnosis } from '../../types';

import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';
import MaleRoundedIcon from '@mui/icons-material/MaleRounded';
import HospitalEntryCard from './EntryCards/HospitalEntryCard';
import HealthCheckEntryCard from './EntryCards/HealthCheckEntryCard';
import OccupationalHealthCheckEntryCard from './EntryCards/OccupationalHealthCheckEntryCard';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({
  entry,
  diagnosisMap,
}: {
  entry: Entry;
  diagnosisMap: Record<string, { diagnosis: string; latin: string }>;
}) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryCard entry={entry} diagnosisMap={diagnosisMap} />;
    case 'HealthCheck':
      return <HealthCheckEntryCard entry={entry} diagnosisMap={diagnosisMap} />;
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthCheckEntryCard
          entry={entry}
          diagnosisMap={diagnosisMap}
        />
      );
    default:
      return assertNever(entry);
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- not used yet but maybe in a further exercise?
  const [diagnosisMap, setDiagnosisMap] = useState<
    Record<string, { diagnosis: string; latin: string }>
  >({});

  const diagnoses: Diagnosis[] = useDiagnoses();

  useEffect(() => {
    const diagnosisMapOrigin: Record<
      string,
      { diagnosis: string; latin: string }
    > = {};
    for (const diagnosis of diagnoses) {
      diagnosisMapOrigin[diagnosis.code] = {
        diagnosis: diagnosis.name,
        latin: diagnosis.latin || '',
      };
    }
    setDiagnosisMap(diagnosisMapOrigin);
  }, [diagnoses]);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetchedPatient = await patientService.getPatientWithId(id);
        setPatient(fetchedPatient);
      }
    };

    void fetchPatient();
  }, [id, diagnoses]);

  return (
    <div>
      {patient && (
        <div>
          <h2>
            {patient.name}{' '}
            {patient.gender === 'male' ? (
              <MaleRoundedIcon />
            ) : (
              <FemaleRoundedIcon />
            )}
          </h2>{' '}
          <p>Occupation: {patient.occupation}</p>
          <p>SSN: {patient.ssn}</p>
          <p>Date of Birth: {patient.dateOfBirth}</p>
          <h3>Entries</h3>
          {(patient.entries as Entry[]).map((entry) => (
            <EntryDetails
              key={entry.id}
              entry={entry}
              diagnosisMap={diagnosisMap}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientPage;
