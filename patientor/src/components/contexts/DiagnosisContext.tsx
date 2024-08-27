import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Diagnosis } from '../../types';
import { apiBaseUrl } from '../../constants';

const DiagnosisContext = createContext<Diagnosis[]>([]);

export const useDiagnoses = () => useContext(DiagnosisContext);

export const DiagnosisProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const { data: diagnoses } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
      );
      setDiagnoses(diagnoses);
    };
    fetchDiagnoses();
  }, []);

  return (
    <DiagnosisContext.Provider value={diagnoses}>
      {children}
    </DiagnosisContext.Provider>
  );
};
