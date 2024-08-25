import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import patientService from '../../services/patients';

import { Patient } from '../../types';

import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';
import MaleRoundedIcon from '@mui/icons-material/MaleRounded';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetchedPatient = await patientService.getPatientWithId(id);
        setPatient(fetchedPatient);
      }
    };
    void fetchPatient();
  }, [id]);

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
        </div>
      )}
    </div>
  );
};

export default PatientPage;
