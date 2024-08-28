import { Entry } from '../../types';

const DiagnosisCodes = ({
  entry,
  diagnosisMap,
}: {
  entry: Entry;
  diagnosisMap: Record<string, { diagnosis: string; latin: string }>;
}) => {
  return (
    <ul>
      {entry.diagnosisCodes?.map((code) => (
        <li key={code}>
          {code} {diagnosisMap[code]?.diagnosis}{' '}
        </li>
      ))}
    </ul>
  );
};

export default DiagnosisCodes;
